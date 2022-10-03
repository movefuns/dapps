// https://www.npmjs.com/package/@starcoin/starcoin
import { providers } from '@starcoin/starcoin';
import { NETWORK } from "./consts";
import { getLocalNetwork } from "./localHelper";


function getNetwork() {
    return getLocalNetwork() || "main"
}

const networks: string[] = NETWORK;
const providerMap: Record<string, any> = {};
networks.forEach((n) => {
    providerMap[n] = new providers.JsonRpcProvider(
        `https://${n}-seed.starcoin.org`,
    );
});

export async function getTxnData(txnHash: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.getTransaction(txnHash);
        return result;
    } catch (error: any) {
        return false;
    }
}


export async function getEventsByTxnHash(txnHash: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.send("chain.get_events_by_txn_hash", [txnHash]);
        return result;
    } catch (error: any) {
        return false;
    }
}


export async function callV2(function_id: string, type_args: any[], args: any[]) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.callV2({
            function_id,
            type_args,
            args,
        });
        return result;
    } catch (error: any) {
        window.console.error(error)
        return false;
    }
}

export async function getBlockByNumber(hash: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.perform("getBlock", {
            blockHash: hash
        });
        return result;
    } catch (error: any) {
        window.console.info(error)
        return false;
    }
}

export async function getAddressData(hash: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.getResource(hash, '0x1::Account::Account');
        return result;
    } catch (error: any) {
        return false;
    }
}

export async function getAddressResources(hash: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.getResources(hash);
        return result;
    } catch (error: any) {
        return false;
    }
}

export async function getBalancesData(hash: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.getBalances(hash);
        return result;
    } catch (error: any) {
        return false;
    }
}

export async function getAddressSTCBalance(hash: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.getResource(
            hash,
            '0x1::Account::Balance<0x1::STC::STC>',
        );
        return result;
    } catch (error: any) {
        return false;
    }
}

export async function getAddressModuleUpdateStrategy(hash: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.callV2({
            function_id: '0x1::PackageTxnManager::get_module_upgrade_strategy',
            type_args: [],
            args: [hash],
        });
        return result;
    } catch (error: any) {
        return false;
    }
}

export async function getAddressUpgradePlanCapability(hash: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.getResource(
            hash,
            '0x1::PackageTxnManager::UpgradePlanCapability',
        );
        return result;
    } catch (error: any) {
        return false;
    }
}

export async function getAddressUpgradeModuleCapability(hash: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.getResource(
            hash,
            '0x1::UpgradeModuleDaoProposal::UpgradeModuleCapability',
        );
        return result;
    } catch (error: any) {
        return false;
    }
}

export async function getEpochData() {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.getResource('0x1', '0x1::Epoch::Epoch');
        return result;
    } catch (error: any) {
        return false;
    }
}

export async function getTokenPrecision(tokenTypeTag: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.callV2({
            function_id: '0x1::Token::scaling_factor',
            type_args: [tokenTypeTag],
            args: [],
        });
        return result;
    } catch (error: any) {
        return false;
    }
}


export async function getNodeInfo(node: string) {
    const provider = new providers.JsonRpcProvider(
        node,
    );
    const result = provider.perform(providers.RPC_ACTION.getNodeInfo, []);
    return result;
}


export async function getGasPrice() {
    const provider = providerMap[getNetwork()];
    const result = provider.perform(providers.RPC_ACTION.getGasPrice, [1]);
    return result;
}


export async function getAddressStateCode(address: string) {
    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.send('state.list_code', [address]);
        return result;
    } catch (error: any) {
        return false;
    }
}

export async function getAddressCode(address: string) {

    const { codes } = await getAddressStateCode(address);

    let codeList: any = [];
    for (const value of Object.keys(codes)) {
        codeList.push(getResolveModule(`${address}::${value}`));
    }

    const all = await Promise.all(codeList);
    return Object.keys(codes).map((value, index) => {
        return { 'name': value, code: all[index] };
    });
}

export async function getResolveModule(moduleId: string) {

    try {
        const provider = providerMap[getNetwork()];
        const result = await provider.send('contract.resolve_module', [moduleId]);
        return result;
    } catch (error: any) {
        window.console.log(error)
        return false;
    }
}