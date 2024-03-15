import { ConnectButton } from "web3uikit"

export default function CheatHeader() {
    return (
        <nav className="p-5 border-b-2 border-sky-400 flex flex-row font-black font-lato">
            <h1 className="py-4 px-4 text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 drop-shadow-[0px_4px_3px_rgba(0,0,0,0.3)]">
                Decentralized Lottery
            </h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton className="drop-shadow-lg" moralisAuth={false} />
            </div>
        </nav>
    )
}
