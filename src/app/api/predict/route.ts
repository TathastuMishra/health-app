import { NextResponse } from "next/server"

interface HealthData {
  age: number
  gender: string
  bloodPressure: string
  cholesterol: number
  smokingStatus: string
  diabetesStatus: string
}

export async function POST(request: Request) {
  const data: HealthData = await request.json()
  
  // Parse blood pressure
  const [systolic, diastolic] = data.bloodPressure.split('/').map(Number)

  // Calculate risk factors
  let riskFactors = 0

  if (data.age > 55) riskFactors++
  if (data.gender === 'male') riskFactors++
  if (systolic >= 140 || diastolic >= 90) riskFactors++
  if (data.cholesterol > 200) riskFactors++
  if (data.smokingStatus === 'current-smoker') riskFactors++
  if (data.diabetesStatus !== 'no-diabetes') riskFactors++

  // Determine health status and consultation need
  const isHealthy = riskFactors <= 2
  const shouldConsult = riskFactors >= 2

  setTimeout(() => {}, 10000)

  return NextResponse.json({ healthy: isHealthy, consult: shouldConsult })
}