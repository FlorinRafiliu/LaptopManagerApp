import { useEffect, useState } from 'react'
import axios from 'axios'
import { deepCopy } from '../../service/serviceOffline'

export default function useLaptopSearch(pageNumber, query, queryId) {
  const [loading, setLoading] = useState(true)
  const [laptops, setLaptops] = useState([])

  useEffect(() => {
    setLaptops([]);
  }, [query, queryId])

  useEffect(() => {
    if(pageNumber === 1)
      setLaptops([]);
  }, [pageNumber, queryId])

  useEffect(() => {
    setLoading(true)

    let cancel
    axios({
      method: 'GET',
      url: `http://localhost:8080/laptops/params?filter=${query}&page=${pageNumber}`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLaptops(prevLaptops => {
        const newLaptops = [...prevLaptops, ...res.data];
        deepCopy(newLaptops);
        return newLaptops;
      })
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
    })
    return () => cancel()
  }, [pageNumber, query, queryId]);

  return { loading, laptops, setLoading, setLaptops };
}