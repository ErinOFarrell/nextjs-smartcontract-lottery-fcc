import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    /**
     * @useEffect is a hook that lets you sychronize a compenent with an external system.
     * @parameters @setup a function with your useEffect's logic, it can optionally return a cleanup function
     * @parameters @optional_dependancies an array of reactive values referenced in the setup code
     * @parameters @optional_dependancies if specified, your Effect will run after initial render and re-renders when any dependancies changed
     * @parameters @optional_dependancies if empty array, Effect will only run after the initial render
     * @parameters @optional_dependancies if you don't pass an array then your Effect runs after every single render and re-render of your component
     */
    useEffect(
        // here's the setup
        () => {
            if (isWeb3Enabled) return
            if (typeof window !== undefined) {
                if (window.localStorage.getItem("connected")) {
                    enableWeb3()
                }
            }
        },
        // here's the depenancy array
        [isWeb3Enabled],
    )

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    // in this return() is the html/what the user sees
    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()

                        if (window !== undefined) {
                            window.localStorage.setItem("connected", "MetaMask")
                        }
                    }}
                    disabled={isWeb3EnableLoading}>
                    Connect Wallet
                </button>
            )}
        </div>
    )
}
