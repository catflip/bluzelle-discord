import axios from "axios";
import { appendFile } from "fs";
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
  //http://sandbox.sentry.net.bluzelle.com/ mainnet
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
      return {
        votingHeight: height,
        votingRound: round,
        votingStep: step,
        votedPower: votedPower,
        proposer:(await this.getMoniker(consensus.round_state.validators.proposer.pub_key.value)),
        
      };
    } catch (e) {
      console.log(url);
      console.log(e);
    }
  }
  
  /**
   *  method to get moniker
   */
  private async getMoniker(pubkey?:string){
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
    

  return validatorSet.has(pubkey)?validatorSet.get(pubkey):{};
  }
  /**
   *  method to get validator
   */
   public async getValidator():Promise<Array<object>>{
    let validatorSet = [];
    // get latest validator candidate information

    let url = `https://${this.url}:${
      this.apiPort
    }/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=200&pagination.count_total=true`;

    try{
        let response = await axios.get(url);
        let result = response.data.validators;
        validatorSet=result;
    }
    catch(e){
        console.log(url);
        console.log(e);
    }
    
  return validatorSet;
  }
  /**
   *  method to get latest block height
   */
  public async getLatestBlockHeight(){
    let url = `https://${this.url}:${
      this.rpcPort
    }/status`;
        try{
            let response = await axios.get(url);
            let status = response.data;
            return new Intl.NumberFormat('en-US').format(status.result.sync_info.latest_block_height);
        }
        catch (e){
            return 0;
        }
  }
  /**
   *  method to get block time
   */
   public async getAverageBlockTime(){
    const rpcUrl=`https://${this.url}:${this.rpcPort}/status`;
    const rpcData=await axios.get(rpcUrl)
    const latestBlockHeight=rpcData.data.result.sync_info.latest_block_height;
    const latestBlockTime=rpcData.data.result.sync_info.latest_block_time;
    const earliestBlockTime=rpcData.data.result.sync_info.earliest_block_time;
    const apiUrl=`https://${this.url}:${this.apiPort}/blocks/${Number(latestBlockHeight)-1}`;
     const apiData=await axios.get(apiUrl)
     const lastTime=apiData.data.block.time
    let dateLatest = new Date(latestBlockTime);
    let dateLast = new Date(lastTime);
    let genesisTime = new Date(earliestBlockTime);
    
    
    let timeDiff = Math.abs(dateLatest.getTime() - dateLast.getTime());
    let blockTime = (dateLatest.getTime() - genesisTime.getTime()) / Number(latestBlockHeight);
    return (blockTime/1000).toFixed(2);
  }
    
}
