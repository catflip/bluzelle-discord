import Head from "next/head";
import { CardCommand } from "../components/CardCommand";
import { HelpCommand } from "../components/HelpCommand";
import { DeployCommand } from "../components/DeployCommand";
import { UndeployCommand } from "../components/UndeployCommand";
import { TotalValidatorCommand } from "../components/TotalValidatorCommand";
import { TotalBlockCommand } from "../components/TotalBlockCommand";
import { BlockTimesCommand } from "../components/BlockTimesCommand";
import { ConsensusStateCommand } from "../components/ConsensusStateCommand";
import { LatestBlockCommand } from "../components/LatestBlockCommand";
import { MarketDataCommand } from "../components/MarketDataCommand";
import { OnlineVotingPowerCommand } from "../components/OnlineVotingPowerCommand";
import { RunningCommand } from "../components/RunningCommand";
import { SetCommand } from "../components/SetCommand";
import { StopCommand } from "../components/StopCommand";
import { UpdateCommand } from "../components/UpdateCommand";
export default function Home(props) {
  return (
    <div className="max-w-lg mx-auto mt-20 p-10 justify-center items-center">
      <Head>
        <title>Commands</title>
      </Head>
      <div className="flex items-center justify-center mb-5 block">
        <a href="/">
          <img
            src={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
            height={75}
            width={75}
            loading="eager"
            className="rounded-full shadow-sm"
            alt={`Discord server icon of ${`Home`}`}
          />
        </a>
      </div>
      <h2 className="text-center font-bold text-5xl">Bluzelle</h2>
      <div className="text-center mb-2 mt-2">
        <a
          href={`/`}
          className="bg-indigo-50 font-medium mt-5 text-indigo-600 px-4 py-1.5 rounded-full inline-block"
        >
          Home
        </a>
      </div>
      <div className="text-center mb-10 mt-2">
        <a
          href={`#`}
          className="bg-indigo-50 font-medium mt-5 text-indigo-600 px-4 py-1.5 rounded-full inline-block"
        >
          Command List
        </a>
      </div>
      
      <h3
        className={
          "rounded-md mb-10 text-center p-2 bg-green-50 text-green-500"
        }
      >
        This is the list of command that you can use to get data from bluzelle
        network in discord
      </h3>
      <div className="grid  gap-2">
     <DeployCommand/>
     <UndeployCommand/>
        <CardCommand
          description="To show which command can be used by admin or user"
          title="/help"
          anything={<HelpCommand/>}
        />
        <CardCommand
          description="this command will get total validator just like in big dipper"
          title="/total-validator"
          anything={
         <TotalValidatorCommand/>
          }
        />
        <CardCommand
          description="to get latest block height"
          title="/total-block"
          anything={
          <TotalBlockCommand/>
          }
        />
         <CardCommand
          description="average block times"
          title="/block-times"
          anything={
          <BlockTimesCommand/>
          }
        />
        <CardCommand
          description="to get consensus state"
          title="/consensus-state"
          anything={
          <ConsensusStateCommand/>
          }
        />
         <CardCommand
          description="to get latest block"
          title="/latest-block"
          anything={
          <LatestBlockCommand/>
          }
        />
        <CardCommand
          description="get blz token and market cap"
          title="/market-data"
          anything={
          <MarketDataCommand/>
          }
        />
          <CardCommand
          description="get online voting power now"
          title="/online-voting-power"
          anything={
          <OnlineVotingPowerCommand/>
          }
        />
        <RunningCommand/>
        <SetCommand/>
        <StopCommand/>
        <UpdateCommand/>
      </div>
    </div>
  );
}
