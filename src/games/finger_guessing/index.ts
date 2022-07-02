import {bcs, utils} from "@starcoin/starcoin";
import {arrayify, hexlify} from "@ethersproject/bytes";
import {getProvder} from "../../utils/stcWalletSdk";
import {NANO_STC, nodeUrlMap} from "../../utils/consts";
import {ADMIN_ADDRESS} from "../index";

export async function gameFingerGuessing(
    token: string,
    input: boolean,
    amount: number
) {
    try {
        const functionId = `${ADMIN_ADDRESS}::GameFingerGuessing::check`;
        const tyArgs = [token];
        const args = [amount, input];
        const nodeUrl = nodeUrlMap[window.starcoin.networkVersion];
        const scriptFunction = await utils.tx.encodeScriptFunctionByResolve(
            functionId,
            tyArgs,
            args,
            nodeUrl
        );
        // Multiple BcsSerializers should be used in different closures, otherwise, the latter will be contaminated by the former.
        const payloadInHex = (function () {
            const se = new bcs.BcsSerializer();
            scriptFunction.serialize(se);
            return hexlify(se.getBytes());
        })();
        const txParams = {
            data: payloadInHex,
        };
        const expiredSecs = 10;
        if (expiredSecs > 0) {
            //  txParams.expiredSecs = expiredSecs
        }
        const starcoinProvider = await getProvder();
        const transactionHash = await starcoinProvider
            .getSigner()
            .sendUncheckedTransaction(txParams);
        return transactionHash;
    } catch (e) {
        window.console.error(e);
        return false;
    }
}

export async function fingerGuessingInitBank(token: any, amount: number) {
    try {
        const functionId = `${ADMIN_ADDRESS}::GameFingerGuessing::init_bank`;
        const tyArgs = [token];
        const args = [amount];
        const nodeUrl = nodeUrlMap[window.starcoin.networkVersion];
        const scriptFunction = await utils.tx.encodeScriptFunctionByResolve(
            functionId,
            tyArgs,
            args,
            nodeUrl
        );

        // Multiple BcsSerializers should be used in different closures, otherwise, the latter will be contaminated by the former.
        const payloadInHex = (function () {
            const se = new bcs.BcsSerializer();
            scriptFunction.serialize(se);
            return hexlify(se.getBytes());
        })();

        const txParams = {
            data: payloadInHex,
        };

        const expiredSecs = 10;
        if (expiredSecs > 0) {
            //  txParams.expiredSecs = expiredSecs
        }

        const starcoinProvider = await getProvder();
        const transactionHash = await starcoinProvider
            .getSigner()
            .sendUncheckedTransaction(txParams);
        window.console.log({transactionHash});
    } catch (e) {
        window.console.error(e);
    }
}

export async function fingerGuessingDeposit(token: any, amount: number) {
    try {
        const functionId = `${ADMIN_ADDRESS}::GameFingerGuessing::deposit`;
        const tyArgs = [token];
        const args = [amount];
        const nodeUrl = nodeUrlMap[window.starcoin.networkVersion];
        const scriptFunction = await utils.tx.encodeScriptFunctionByResolve(
            functionId,
            tyArgs,
            args,
            nodeUrl
        );

        // Multiple BcsSerializers should be used in different closures, otherwise, the latter will be contaminated by the former.
        const payloadInHex = (function () {
            const se = new bcs.BcsSerializer();
            scriptFunction.serialize(se);
            return hexlify(se.getBytes());
        })();

        const txParams = {
            data: payloadInHex,
        };

        const expiredSecs = 10;
        if (expiredSecs > 0) {
            //  txParams.expiredSecs = expiredSecs
        }

        const starcoinProvider = await getProvder();
        const transactionHash = await starcoinProvider
            .getSigner()
            .sendUncheckedTransaction(txParams);
        window.console.log({transactionHash});
    } catch (e) {
        window.console.error(e);
    }
}

export async function fingerGuessingWithdraw(token: any, amount: number) {
    try {
        const functionId = `${ADMIN_ADDRESS}::GameFingerGuessing::withdraw`;
        const tyArgs = [token];
        const args = [amount];
        const nodeUrl = nodeUrlMap[window.starcoin.networkVersion];
        const scriptFunction = await utils.tx.encodeScriptFunctionByResolve(
            functionId,
            tyArgs,
            args,
            nodeUrl
        );

        // Multiple BcsSerializers should be used in different closures, otherwise, the latter will be contaminated by the former.
        const payloadInHex = (function () {
            const se = new bcs.BcsSerializer();
            scriptFunction.serialize(se);
            return hexlify(se.getBytes());
        })();

        const txParams = {
            data: payloadInHex,
        };

        const expiredSecs = 10;
        if (expiredSecs > 0) {
            //  txParams.expiredSecs = expiredSecs
        }

        const starcoinProvider = await getProvder();
        const transactionHash = await starcoinProvider
            .getSigner()
            .sendUncheckedTransaction(txParams);
        window.console.log({transactionHash});
    } catch (e) {
        window.console.error(e);
    }
}

export async function getBankAmount(token: any) {
    try {
        const provider = await getProvder();
        const result = await provider.getResource(
            ADMIN_ADDRESS,
            `${ADMIN_ADDRESS}::GameFingerGuessing::Bank<${token}>`
        );
        if (result && result.bank && result.bank) {
            // @ts-ignore
            return result.bank.value / NANO_STC;
        }
        return 0;
    } catch (e) {
        window.console.error(e);
        return 0;
    }
}

export function decodeCheckEvent(data: string) {
    const de = new bcs.BcsDeserializer(arrayify(data));
    const amount = de.deserializeU128();
    const result = de.deserializeU8();
    const input = de.deserializeU8();
    return {
        amount,
        result,
        input,
    };
}
