import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchContext } from '@app/store/search-car'

const makeUrl = (initialUrl, items, searchParams = null) => {
  let paramsArray = []
  let url = ''

  if (searchParams) {
    const makeParamsArray = Object.keys(searchParams).map(key => ({
      name: key,
      value: searchParams[key],
    }))

    paramsArray = makeParamsArray
  }

  if (paramsArray.length && !items.length) {
    items = paramsArray
  }

  items?.forEach(item => {
    if (item?.value) {
      url += `&${item?.name}=${item?.value}`
    }
  })

  // e.g. "/cars/search?" + "sort=...&brand=..."
  url = initialUrl + url?.slice(1)

  if (paramsArray.length) {
    return { url, paramsArray }
  } else {
    return url
  }
}

const fetchSearchedCars = async url => {
  try {
    const res = await fetch(url)
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

const useCalcSearchedCars = () => {
  const [countOffers, setCountOffers] = useState()
  const [queriesArray, setQueriesArray] = useState()
  const [apiUrl, setApiUrl] = useState('')
  const [routeUrl, setRouteUrl] = useState('')

  const router = useRouter()

  const {
    brand,
    model,
    yearFrom,
    yearTo,
    bodyType,
    fuelType,
    sorting,
    page,
    limit,
  } = useSearchContext()

  useEffect(() => {
    setQueriesArray([
      { name: 'sort', value: sorting },
      { name: 'page', value: page },
      { name: 'limit', value: limit },
      { name: 'brand_id', value: brand?._id },
      { name: 'model_id', value: model?._id },
      { name: 'year_from', value: yearFrom?.label },
      { name: 'year_to', value: yearTo?.label },
      { name: 'body_type_id', value: bodyType?._id },
      { name: 'fuel_type_id', value: fuelType?._id },
    ])
  }, [brand, model, yearFrom, yearTo, bodyType, fuelType, sorting, page, limit])

  useEffect(() => {
    const routeUrlValue = makeUrl('/cars/search?', queriesArray)
    const apiUrlValue = makeUrl('/api/searched_cars?', queriesArray)

    setApiUrl(apiUrlValue)
    setRouteUrl(routeUrlValue)
  }, [queriesArray])

  useEffect(() => {
    // console.log('queriesArray: ', routeUrl)
  }, [routeUrl])

  // Count number of searched cars
  useEffect(() => {
    const fetchSearchedCarsData = async () => {
      const urlWithoutPageAndLimit = apiUrl
        .split('&')
        .filter(
          param => !param.startsWith('page=') && !param.startsWith('limit=')
        )
        .join('&')
      // console.log('first ', urlWithoutPageAndLimit)

      const data = await fetchSearchedCars(urlWithoutPageAndLimit)
      // console.log('apurl>> ', apiUrl)

      setCountOffers(data?.length)
    }
    // if (brand || model || yearFrom || yearTo || bodyType || fuelType || sorting)
    fetchSearchedCarsData()
  }, [apiUrl])

  // Count number of all cars
  useEffect(() => {
    const countNumOfAllOffers = async () => {
      const allCars = await fetchSearchedCars('/api/cars')
      setCountOffers(allCars?.length)
    }
    if (!brand && !model && !yearFrom && !yearTo && !bodyType && !fuelType)
      countNumOfAllOffers()
  }, [brand, model, yearFrom, yearTo, bodyType, fuelType])

  // Handle form submition
  const handleSubmit = e => {
    e.preventDefault()
    router.push(routeUrl)
  }

  // Disable submitting form on clicking 'Enter' hotkey
  const handleKeyDown = e => {
    if (e.keyCode === 13 && document.activeElement.tagName !== 'BUTTON') {
      e.preventDefault()
    }
  }

  return { countOffers, handleSubmit, handleKeyDown, routeUrl }
}

export default useCalcSearchedCars