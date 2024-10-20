"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HealthForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    bloodPressure: "",
    cholesterol: "",
    smokingStatus: "",
    diabetesStatus: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    const result = await response.json()
    router.push(`/result?healthy=${result.healthy}&consult=${result.consult}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="age">Age</Label>
        <Input id="age" name="age" type="number" required onChange={handleChange} value={formData.age} />
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select name="gender" onValueChange={(value) => handleSelectChange("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="bloodPressure">Blood Pressure (systolic/diastolic)</Label>
        <Input
          id="bloodPressure"
          name="bloodPressure"
          type="text"
          required
          onChange={handleChange}
          value={formData.bloodPressure}
          placeholder="e.g., 120/80"
        />
      </div>
      <div>
        <Label htmlFor="cholesterol">Cholesterol levels (mg/dL)</Label>
        <Input
          id="cholesterol"
          name="cholesterol"
          type="number"
          required
          onChange={handleChange}
          value={formData.cholesterol}
        />
      </div>
      <div>
        <Label htmlFor="smokingStatus">Smoking Status</Label>
        <Select name="smokingStatus" onValueChange={(value) => handleSelectChange("smokingStatus", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select smoking status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="non-smoker">Non-smoker</SelectItem>
            <SelectItem value="former-smoker">Former smoker</SelectItem>
            <SelectItem value="current-smoker">Current smoker</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="diabetesStatus">Diabetes Status</Label>
        <Select name="diabetesStatus" onValueChange={(value) => handleSelectChange("diabetesStatus", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select diabetes status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-diabetes">No diabetes</SelectItem>
            <SelectItem value="pre-diabetes">Pre-diabetes</SelectItem>
            <SelectItem value="type1">Type 1 diabetes</SelectItem>
            <SelectItem value="type2">Type 2 diabetes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Loading..." : "Submit"}
        </Button>
    </form>
  )
}