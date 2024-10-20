import HealthForm from "@/components/HealthForm";


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Cardiovascular Health Assessment</h1>
      <p className="mb-4">
        Please fill out the form below to receive an AI-powered assessment of your cardiovascular health.
      </p>
      <HealthForm />
    </div>
  )
}