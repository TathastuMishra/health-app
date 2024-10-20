"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ResultPage() {
  const searchParams = useSearchParams()
  const isHealthy = searchParams.get("healthy") === "true"
  const shouldConsult = searchParams.get("consult") === "true"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Health Assessment Result</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-lg mb-4">
          Based on the information you provided, our AI assessment indicates that you are:
        </p>
        <p className={`text-xl font-semibold mb-4 ${isHealthy ? "text-green-600" : "text-red-600"}`}>
          {isHealthy ? "Healthy" : "At Risk"}
        </p>
        <p className="mb-4">
          {shouldConsult
            ? "We recommend that you consult with a doctor for a more comprehensive evaluation."
            : "While your results look good, it's always beneficial to maintain a healthy lifestyle and have regular check-ups."}
        </p>
      </div>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}