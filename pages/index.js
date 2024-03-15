// imports work with our frontend, but require does not
// nodejs !== js/ecmascript, frontend and backend js are a little diff
import Head from "next/head"
import styles from "../styles/Home.module.css"
import CheatHeader from "../components/CheatHeader"
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Raffle.sol smart contract lottery</title>
                <meta name="description" content="Gljjjkkjl;" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CheatHeader></CheatHeader>
            <LotteryEntrance></LotteryEntrance>
        </div>
    )
}
