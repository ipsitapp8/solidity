"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useDividendContract } from "@/hooks/useContract"

const SampleIntregation = () => {
  const { isConnected } = useAccount()

  const [mintAmount, setMintAmount] = useState("")
  const [divAmount, setDivAmount] = useState("")

  const { data, actions, state } = useDividendContract()

  const handleMint = async () => {
    if (!mintAmount) return
    try {
      await actions.mint(mintAmount)
      setMintAmount("")
    } catch (err) {
      console.error(err)
    }
  }

  const handleDistribute = async () => {
    if (!divAmount) return
    try {
      await actions.distributeDividends(divAmount)
      setDivAmount("")
    } catch (err) {
      console.error(err)
    }
  }

  const handleWithdraw = async () => {
    try {
      await actions.withdrawDividends()
    } catch (err) {
      console.error(err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please connect your wallet to continue.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Dividend Token Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Total Supply</p>
          <p className="text-xl">{data.totalSupply}</p>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Your Balance</p>
          <p className="text-xl">{data.myBalance}</p>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Your Dividends</p>
          <p className="text-xl">{data.myDividends}</p>
        </div>
      </div>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Mint amount"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleMint}
          disabled={state.isLoading}
          className="w-full p-2 bg-primary text-white rounded"
        >
          {state.isLoading ? "Processing..." : "Mint Tokens"}
        </button>
      </div>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Dividend amount (FLR)"
          value={divAmount}
          onChange={(e) => setDivAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleDistribute}
          disabled={state.isLoading}
          className="w-full p-2 bg-secondary text-white rounded"
        >
          {state.isLoading ? "Processing..." : "Distribute Dividends"}
        </button>
      </div>

      <button
        onClick={handleWithdraw}
        disabled={state.isLoading}
        className="w-full p-2 bg-destructive text-white rounded"
      >
        {state.isLoading ? "Processing..." : "Withdraw Dividends"}
      </button>

      {state.hash && (
        <div className="p-3 border rounded">
          <p className="text-xs text-muted-foreground">TX Hash</p>
          <p className="text-sm break-all">{state.hash}</p>
        </div>
      )}

      {state.error && (
        <div className="p-3 border border-red-500 text-red-500 rounded">
          Error: {state.error.message}
        </div>
      )}
    </div>
  )
}

export default SampleIntregation
