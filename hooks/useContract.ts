"use client"

import { useState } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { formatEther } from "viem"
import { contractABI, contractAddress } from "@/lib/contract"

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  mint: (amount: string) => Promise<void>
  distribute: (amount: string) => Promise<void>
  withdraw: () => Promise<void>
}

export const useWillContract = () => {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "balances",
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  })

  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const mint = async (amount: string) => {
    if (!amount) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "mint",
        args: [BigInt(amount)]
      })
    } finally {
      setIsLoading(false)
    }
  }

  const distribute = async (amount: string) => {
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "distributeDividends",
        value: BigInt(amount)
      })
    } finally {
      setIsLoading(false)
    }
  }

  const withdraw = async () => {
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "withdrawDividends"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const data = {
    myBalance: balance ? formatEther(balance as bigint) : "0"
  }

  const actions: ContractActions = {
    mint,
    distribute,
    withdraw
  }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  }

  return { data, actions, state }
}
