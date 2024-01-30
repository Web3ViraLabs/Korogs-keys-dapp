"use server";

type FetchCsvResponse = string[] | null;

import NodeCache from "node-cache";

const cache = new NodeCache();

async function readWalletIdsFromCsv(csvUrl: string): Promise<FetchCsvResponse> {
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    if (!csvText) {
      return [];
    }

    const lines = csvText.split(",");
    const walletIds = lines
      .map((line) => line.trim())
      .filter((line) => line !== "" && isValidEthereumAddress(line));

    console.log("Fetched walletIds from CSV:", walletIds);

    return walletIds;
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error);
    return null;
  }
}

export async function isUserEligible(address: `0x${string}`) {
  try {
    const csvUrl =
      "https://cdn.discordapp.com/attachments/1188281241351504004/1201306884544676020/wallets.csv?ex=65c95738&is=65b6e238&hm=d9ec5153586034cd98410f2df2e6768bbfdfe31e1c4e88f78f6ea46554b31ce8&";

    let walletIds = cache.get(csvUrl) as FetchCsvResponse;

    if (!walletIds) {
      walletIds = await readWalletIdsFromCsv(csvUrl);
      cache.set(csvUrl, walletIds, 3600);
      console.log("Caching walletIds");
    } else {
      console.log("Using walletIds from cache");
    }

    console.log("walletIds", walletIds);

    if (!walletIds) {
      return false;
    }

    return walletIds.includes(address);
  } catch (error) {
    console.error("Error checking user eligibility:", error);
    return false;
  }
}

function isValidEthereumAddress(address: string): boolean {
  const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  return ethereumAddressRegex.test(address);
}
