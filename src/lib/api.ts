import axios from "axios";
import { bech32 } from "bech32";
import * as numeral from "numeral";
import * as numbro from "numbro";
import * as moment from "moment-timezone"
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
   *  the api port of bluzelle network url
   */
  public bigDipperUrl: string;
  /**
   *  get it from console in here https://bigdipper.testnet.private.bluzelle.com/ by console.log(Meteor.settings.public.bech32PrefixConsAddr)
   */
  private bech32PrefixConsAddr: string;
  private bech32PrefixAccAddr: string;
  private coins: Array<any>;
  private bondDenom: string;
  //http://sandbox.sentry.net.bluzelle.com/ mainnet
  constructor(
    url: string = "client.sentry.testnet.private.bluzelle.com",
    apiPort: number = 1317,
    rpcPort: number = 26657,
    bigDipperUrl: string = "https://bigdipper.testnet.private.bluzelle.com"
  ) {
    this.url = url;
    this.apiPort = apiPort;
    this.rpcPort = rpcPort;
    this.bigDipperUrl = bigDipperUrl;
    this.bech32PrefixConsAddr = "bluzellevalcons";
    this.bech32PrefixAccAddr = "bluzelle";
    this.coins = [
      {
        denom: "ubnt",
        displayName: "BLZ",
        fraction: 1000000,
      },
    ];
    this.bondDenom = "ubnt";
  }
   /**
   *  get latest block
   */
  async getLatestBlock(){
   
    let height = await this.getLatestBlockHeight();
    let url = `https://${this.url}:${this.apiPort}/blocks/${height}`;
    let data= (await axios.get(url)).data;
    let format = "D MMM YYYY, h:mm:ssa z";
    let timezone = moment.tz.guess()
    let time = moment.utc(data.block.header.time);
    let proposerHash=await this.getValidatorByProposerAddress(data.block.header.proposer_address)
    let proposerAddressData=await this.getMoniker(proposerHash.pub_key.value)
    return {
      time:time.format(format),
      hash:data.block_id.hash,
      proposer:`[${proposerAddressData.description.moniker}](${this.bigDipperUrl}/validator/${proposerAddressData.operator_address})`,
      transNum:data.block.data.txs?data.block.data.txs.length:0,
      height:`[${height}](${this.bigDipperUrl}/blocks/${height})`
    }
              
  }
  /**
   *  get bluzelle coin stats
   */
  async getCoinStats(){
    let coinId = "bluzelle";
    let url;
        if (coinId){
            try{
                let now = new Date();
                now.setMinutes(0);
                url = "https://api.coingecko.com/api/v3/simple/price?ids="+coinId+"&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true";
                let response =await axios.get(url);
                if (response.status == 200){
                    // console.log(JSON.parse(response.content));
                    let data = response.data;
                    data = data[coinId];
                    // console.log(coinStats);
                    return data
                }
            }
            catch(e){
                console.log(url);
                console.log(e);
            }
        }
        else{
            return "No coingecko Id provided."
        }
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
        proposer: await this.getMoniker(
          consensus.round_state.validators.proposer.pub_key.value
        ),
      };
    } catch (e) {
      console.log(url);
      console.log(e);
    }
  }
  /**
   *  get delegator address from operator address
   */
  getDelegator(operatorAddr:any) {
    let address = bech32.decode(operatorAddr);
    return bech32.encode(this.bech32PrefixAccAddr, address.words);
  }
  /**
   *  method to get moniker
   */
  private async getMoniker(pubkey?: string) {
    let validatorSet = new Map();
    // get latest validator candidate information

    let url = `https://${this.url}:${this.apiPort}/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=200&pagination.count_total=true`;

    try {
      let response = await axios.get(url);
      let result = response.data.validators;
      result.forEach((validator:any) =>
        validatorSet.set(validator.consensus_pubkey.key, validator)
      );
    } catch (e) {
      console.log(url);
      console.log(e);
    }

    return validatorSet.has(pubkey) ? validatorSet.get(pubkey) : {};
  }
  /**
   *  method to get validator
   */
  public async getValidator(): Promise<Array<object>> {
    let validatorSet = [];
    // get latest validator candidate information

    let url = `https://${this.url}:${this.apiPort}/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=200&pagination.count_total=true`;

    try {
      let response = await axios.get(url);
      let result = response.data.validators;
      validatorSet = result;
    } catch (e) {
      console.log(url);
      console.log(e);
    }

    return validatorSet;
  }
  /**
   *  method to get latest block height
   */
  public async getLatestBlockHeight() {
    let url = `https://${this.url}:${this.rpcPort}/status`;
    try {
      let response = await axios.get(url);
      let status = response.data;
      return status.result.sync_info.latest_block_height
    
    } catch (e) {
      return 0;
    }
  }
  /**
   *  method to get online voting power
   */
  public async getOnlineVotingPower() {
    let validators:any = [];
    let page = 0;
    let result;
    do {
      const url = `https://${this.url}:${
        this.rpcPort
      }/validators?page=${++page}&per_page=100`;
      let response = await axios.get(url);
      result = response.data.result;
      validators = [...validators, ...result.validators];
    } while (validators.length < parseInt(result.total));

    let activeVP = 0;
    for (const v in validators) {
      activeVP += parseInt(validators[v].voting_power);
    }
    let activeVotingPower = activeVP;
    return activeVotingPower;
  }
  /**
   *  method to get validator by proposer address example 1DCD10379369E699622E5FF7DF27C999C4B4B31D
   */
  private async getValidatorByProposerAddress(proposerAddress:string) {
    let url = `https://${this.url}:${this.rpcPort}/validators`;
    try {
      let response = await axios.get(url);
      let status = response.data;
      return status.result.validators.find((a:any)=>a.address===proposerAddress);
    } catch (e) {
      return [];
    }
  }
  /**
   *  method to get validator detail by address
   */
  public async getValidatorByAddress(address: string) {
    let url = `https://${this.url}:${this.apiPort}/cosmos/staking/v1beta1/validators/${address}`;
    try {
      let response = await axios.get(url);
      let status = response.data;
      return status;
    } catch (e) {
      return {};
    }
  }
  private async getBondedToken(): Promise<{
    bondedTokens: number;
    notBondedTokens: number;
  }> {
    let chainStates: { bondedTokens: number; notBondedTokens: number } = {
      bondedTokens: 0,
      notBondedTokens: 0,
    };
    try {
      let url = `https://${this.url}:${this.apiPort}/cosmos/staking/v1beta1/pool`;
      let response = await axios.get(url);
      let bonding = response.data.pool;
      chainStates.bondedTokens = parseInt(bonding.bonded_tokens);
      chainStates.notBondedTokens = parseInt(bonding.not_bonded_tokens);
      return chainStates;
    } catch (e) {
      return { bondedTokens: 0, notBondedTokens: 0 };
    }
  }
  private async getTotalSupply() {
    let StakingCoin = this.coins.find((coin) => coin.denom === this.bondDenom);
    try {
      let url =
        `https://${this.url}:${this.apiPort}/cosmos/bank/v1beta1/supply/` +
        StakingCoin.denom;
      let response = await axios.get(url);
      let supply = response.data;
      return parseInt(supply.amount.amount);
    } catch (e) {
      return 0;
    }
  }
  public async getPercentageAndTotalStake() {
    let StakingCoin = this.coins.find((coin) => coin.denom === this.bondDenom);
    
    return {
      percentage: numeral(
        (await this.getBondedToken()).bondedTokens /
          (await this.getTotalSupply())
      ).format("0.00%"),
      // @ts-ignore
      totalStake: numbro(
        (await this.getTotalSupply()) / StakingCoin.fraction
      ).format("0.00a"),
    };
  }
  /**
   *  method to get block time
   */
  public async getAverageBlockTime() {
    const rpcUrl = `https://${this.url}:${this.rpcPort}/status`;
    const rpcData = await axios.get(rpcUrl);
    const latestBlockHeight = rpcData.data.result.sync_info.latest_block_height;
    const latestBlockTime = rpcData.data.result.sync_info.latest_block_time;
    const earliestBlockTime = rpcData.data.result.sync_info.earliest_block_time;
    const apiUrl = `https://${this.url}:${this.apiPort}/blocks/${
      Number(latestBlockHeight) - 1
    }`;
    const apiData = await axios.get(apiUrl);
    const lastTime = apiData.data.block.time;
    let dateLatest = new Date(latestBlockTime);
    let dateLast = new Date(lastTime);
    let genesisTime = new Date(earliestBlockTime);

    // let timeDiff = Math.abs(dateLatest.getTime() - dateLast.getTime());
    let blockTime =
      (dateLatest.getTime() - genesisTime.getTime()) /
      Number(latestBlockHeight);
    return (blockTime / 1000).toFixed(2);
  }
}
