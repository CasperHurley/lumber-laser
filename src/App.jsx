import { useState } from 'react'
import './App.css'
import MeasurementsForm from './components/MeasurementsForm'
import ProjectLayout from './components/ProjectLayout'
import { calculateBoardLayout, getMixedBoardLengthLayout } from 'woodcutting-calculator'

function App() {
  const UNITS = {IN: "In", CM: "cm"}

  const [cutPlans, setCutPlans] = useState([])
  const [mixedPlan, setMixedPlan] = useState(new Map())
  const [selectedUnit, setSelectedUnit] = useState(UNITS.IN)

  const STOCK_LENGTHS = [72, 96, 120] // 72, 96, 120

  const getProjectPlans = (measurements) => {
    const plans = STOCK_LENGTHS.map(stockBoardLength => calculateBoardLayout(stockBoardLength, [...measurements]))
    const mixedBoardLengthLayout = getMixedBoardLengthLayout(STOCK_LENGTHS, plans)
    setMixedPlan(mixedBoardLengthLayout)
    setCutPlans(plans)
  }

  return (
    <>
      <MeasurementsForm 
        getProjectPlans={getProjectPlans}
        setSelectedUnit={setSelectedUnit}
      />
      <ProjectLayout 
        cutPlans={cutPlans}
        selectedUnit={selectedUnit}
        mixedPlan={mixedPlan}
      />
    </>
  )
}

export default App
