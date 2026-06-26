import { useState, useEffect } from "react"

function App() {
  const [freelancers, setFreelancers] = useState([])
  const [name, setName] = useState("")
  const [skill, setSkill] = useState("")

  const getFreelancers = async () => {
    const res = await fetch("http://localhost:5000/freelancers")
    const data = await res.json()
    setFreelancers(data)
  }

  useEffect(() => {
    getFreelancers()
  }, [])

  const addFreelancer = async () => {
    await fetch("http://localhost:5000/freelancers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name , skill: skill})
    })
    setName("")
    setSkill("")
    getFreelancers()
  }

  const deleteFreelancer = async (index) => {
  await fetch(`http://localhost:5000/freelancers/${index}`, { method: "DELETE" })
  getFreelancers()
}

  return (
    <div>
      <h2>Freelancer Profile Manager - by Wadie</h2>  
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="freelancer name" />
      <input value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="freelancer skill" />
      <button onClick={addFreelancer}>Add</button>

  
      {freelancers.map((f, index) => (
  <div key={index}>
    <h3>{f.name} - {f.skill}</h3>
    <button onClick={() => deleteFreelancer(f.id)}>Delete</button>
  </div>
))}
    </div>
  )
}

export default App