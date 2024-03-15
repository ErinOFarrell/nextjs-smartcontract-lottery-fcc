/**
 * @dev We need a function to enter the lottery
 *
 */
import { useWeb3Contract } from "react-moralis"
import { contractAddresses, contractAbi } from "../constants/import.js"
import { useMoralis } from "react-moralis"
import Moralis from "moralis-v1"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numberOfPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = (await getRecentWinner()).toString()
        setEntranceFee(entranceFeeFromCall)
        setNumberOfPlayers(numberOfPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div className="p-5">
            {raffleAddress ? (
                <div>
                    <button
                        id="enter-btn"
                        className=" bg-blue-600   hover:ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-300  hover:bg-gradient-to-r from-blue-700 to-red-500 text-white font-bold py-2 px-4 mb-10 rounded ml-auto shadow-[0_10px_15px_-3px_rgba(0,0,0,0.25)]"
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                        disabled={isLoading || isFetching}>
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full bg-gradient-to-r from-blue-700 to-red-500"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>

                    <span className="ml-1">
                        Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                    </span>
                    <div className="mb-5 bg-emerald-500 rounded h-9 w-100">
                        Number of Players: {numberOfPlayers}
                    </div>
                    <div className="mb-5 bg-emerald-500 rounded h-9 w-100">
                        Last Winner: {recentWinner}{" "}
                    </div>
                    <div className="mb-5 bg-emerald-500 rounded h-9 w-100">BLAHBLAHBLAHBLAH</div>
                </div>
            ) : (
                <div>No Address</div>
            )}
        </div>
    )
}
