import axios from "axios";
import { bech32,bech32m } from "bech32";
import { tmhash } from 'tendermint/lib/hash'
import { createAddress } from '@tendermint/sig';
interface PubKey{
  "@type":string
   key:string
 
}
/**
 *  Connect with the bluzelle network API and RPC to get the data
 */
export class Api {
  /**
   *  the url of the bluzelle network default to client.sentry.testnet.private.bluzelle.com
   */
  private url: string;
  /**
   *  the rpc port of bluzelle network url
   */
  private rpcPort: number;
  /**
   *  the api port of bluzelle network url
   */
  private apiPort: number;
  /**
   *  get it from console in here https://bigdipper.testnet.private.bluzelle.com/ by console.log(Meteor.settings.public.bech32PrefixConsAddr)
   */
  private bech32PrefixConsAddr: string;
  constructor(
    url: string = "client.sentry.testnet.private.bluzelle.com",
    apiPort: number = 1317,
    rpcPort: number = 26657
  ) {
    this.url = url;
    this.apiPort = apiPort;
    this.rpcPort = rpcPort;
    this.bech32PrefixConsAddr = "bluzellevalcons";
  }
  /**
   *  get consensus state from the rpc
   */
  async getConsensusState() {
    const url: string = `https://${this.url}:${this.rpcPort}/dump_consensus_state`;
    console.log(url)
    try {
      let response = await axios.get(url);
      let consensus = response.data;
      consensus = consensus.result;
      let height = consensus.round_state.height;
      let round = consensus.round_state.round;
      let step = consensus.round_state.step;
      let votedPower = Math.round(
        parseFloat(
          consensus.round_state.votes[round].prevotes_bit_array.split(" ")[3]
        ) * 100
      );
      
      return this.pubkeyToBech32(consensus.round_state.validators.proposer.pub_key,"bluzellevaloper")
      return {
        votingHeight: height,
        votingRound: round,
        votingStep: step,
        votedPower: votedPower,
        proposerAddress:this.pubkeyToBech32(consensus.round_state.validators.proposer.pub_key,"bluzellevaloper"),
        prevotes: consensus.round_state.votes[round].prevotes,
        precommits: consensus.round_state.votes[round].precommits,
      };
    } catch (e) {
      console.log(url);
      console.log(e);
    }
  }
  pubkeyToBech32(pubkey:{type:string,value:string}, prefix:string) {
    let buffer;
    try {
      let pubkeyAminoPrefix = Buffer.from('1624DE6420', 'hex');
      buffer = Buffer.alloc(37);

      pubkeyAminoPrefix.copy(buffer, 0)
      Buffer.from(pubkey.value, 'base64').copy(buffer, pubkeyAminoPrefix.length)

      return bech32.encode(prefix, bech32.toWords(buffer.slice(0,20)))
    }
    catch (e){
        console.log("Error converting from pubkey to bech32: %o\n %o", pubkey, e);
        return false
    }
}
  /**
   *  get proposer moniker
   */
  public async getProposerMoniker() {
    let validators = [];
    let page = 0;
    // let nextKey = 0;
    try {
      let result;
      do {
        const url: string = `https://${this.url}:${
          this.rpcPort
        }/validators?&page=${++page}&per_page=100`;
        let response = await axios.get(url);
        result = response.data.result;

        validators = [...validators, ...result.validators];
      } while (validators.length < parseInt(result.total));
      let tempValidators = {};
      for (let v in validators) {
        validators[v].valconsAddress = this.hexToBech32(
          validators[v].address,
          this.bech32PrefixConsAddr
        );
        tempValidators[validators[v].address] = validators[v];
      
      }
      return tempValidators;
    } catch (e) {
      console.log("Getting validator set at height %o: %o", e);
    }
  }
  /**
   *  method to convert hex to bech32
   */
  private hexToBech32(address: string, prefix: string) {
    let addressBuffer = Buffer.from(address, "hex");
    return bech32.encode(prefix, bech32.toWords(addressBuffer));
  }
 /**
   *  method to convert hex to bech32
   */
  public async getMoniker(pubkey?:string){
    let validatorSet = new Map();
    // get latest validator candidate information

    let url = `https://${this.url}:${
      this.apiPort
    }/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=200&pagination.count_total=true`;

    try{
        let response = await axios.get(url);
        let result = response.data.validators;
        result.forEach((validator) => validatorSet.set(validator.consensus_pubkey.key,validator)  );
    }
    catch(e){
        console.log(url);
        console.log(e);
    }
    
    console.log(validatorSet.size)
  return "validatorSet";
  }
}
