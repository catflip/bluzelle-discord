import { Api } from "./api";
export async function totalValidator(api:Api){
    const totalValidator = await api.getValidator();
    const embed = {
      color: 0x0099ff,
      title: "Bluzelle bot",
      url: "https://bluzelle.com/",
      thumbnail: {
        url: "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      },
      fields: [
        {
          name: "Active Validators",
          value: `${
            totalValidator.filter(
              (val: any) =>
                val.jailed === false && val.status === "BOND_STATUS_BONDED"
            ).length
          } out of ${totalValidator.length} validators`,
        },
      ],

      timestamp: new Date(),
    };
    return embed

}

export async function totalBlocks(api:Api) {
    const totalBlock = await api.getLatestBlockHeight();
    const embed = {
      color: 0x0099ff,
      title: "Bluzelle bot",
      url: "https://bluzelle.com/",
      thumbnail: {
        url: "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      },
      fields: [
        {
          name: "Latest Block Height",
          value: `${totalBlock}`,
        },
      ],

      timestamp: new Date(),
    };
    return embed
}