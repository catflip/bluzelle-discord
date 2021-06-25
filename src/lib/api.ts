import axios from "axios";
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
  constructor(
    url: string = "client.sentry.testnet.private.bluzelle.com",
    apiPort: number = 1317,
    rpcPort: number = 26657
  ) {
    this.url = url;
    this.apiPort = apiPort;
    this.rpcPort = rpcPort;
  }
  /**
   *  get consensus state from the rpc
   */
  async getConsensusState() {
    const url: string = `https://${this.url}:${this.rpcPort}/dump_consensus_state`;
    try {
      let response = await axios.get(url);
      let consensus =response.data;
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
        proposerAddress: consensus.round_state.validators.proposer.address,
        prevotes: consensus.round_state.votes[round].prevotes,
        precommits: consensus.round_state.votes[round].precommits,
      };
    } catch (e) {
      console.log(url);
      console.log(e);
    }
  }
  private getProposerName(){
    let validators = []
    let page = 0;
    // let nextKey = 0;
    try {
        let result;

        do {
            let url = RPC+`/validators?height=${height}&page=${++page}&per_page=100`;
            let response = HTTP.get(url);
            result = JSON.parse(response.content).result;
            // console.log("========= validator result ==========: %o", result)
            validators = [...validators, ...result.validators];
                
            // console.log(validators.length);
            // console.log(parseInt(result.total));
        }
        while (validators.length < parseInt(result.total))

    }
    catch(e){
        console.log("Getting validator set at height %o: %o", height, e)
    }
  }
}
