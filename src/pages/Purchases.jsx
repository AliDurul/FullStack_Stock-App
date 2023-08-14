import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"
const Purchases = () => {

  const { getStockData } = useStockCall()
  useEffect(() => {
    getStockData('purchases')


  }, [])

  return <div>Purchases</div>
}

export default Purchases
