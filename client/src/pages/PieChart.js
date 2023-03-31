import { pieData } from '../chartData/PieData'
import { MyResponsivePie } from '../charts/pieChart'
import Draggable from 'react-draggable'


export default function PieChart() {


  return (
    <Draggable>
    <div className="pieChart">
      <MyResponsivePie data={pieData}/>
    </div>
  </Draggable>
  )
}