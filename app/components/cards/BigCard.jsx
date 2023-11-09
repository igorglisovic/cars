import Car from '@public/assets/car.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const BigCard = ({ car }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/car/${car._id}`)
  }
  return (
    <div
      onClick={handleClick}
      className="flex rounded-[33px] overflow-hidden cursor-pointer shadow-md h-[160px]"
    >
      <div className="flex max-w-[35%] max-h-max overflow-hidden shadow-md">
        {car?.images?.length ? (
          <Image
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload/v${car?.images[0]?.version}/${car?.images[0]?.public_id}`}
            width={220}
            height={150}
            // src={Car}
            alt=""
            className="object-cover"
          />
        ) : (
          <Image src={Car} className="w-full h-full object-cover" alt="" />
        )}
      </div>
      <article className="flex flex-grow flex-col justify-between bg-white px-5 py-2.5 ">
        <h3 className="font-semibold text-xl md:text-2xl">
          {car.brand.label} {car.model.label}
        </h3>
        <div className="flex justify-between items-center">
          <span className="mr-5 font-medium text-base md:text-xl">
            €{car?.price}
          </span>
        </div>
        <div className="flex flex-col gap-[1px] font-normal text-[10px] text-xs xl:text-sm">
          <div className="flex gap-1 items-center">
            <span>
              {car.reg_year.label}. {car.body_type.label}
            </span>
            <span> | </span>
            <span>{car.mileage}km</span>
            <span> | </span>
            <span>{car.transmission_type.label}</span>
          </div>
          <div className="flex gap-1 items-center">
            <span>
              {car.fuel_type.label}, {car.displacement}cm<sup>3</sup>
            </span>
            <span> | </span>
            <span>
              {car.power?.hp}hp ({car.power?.kw}kW)
            </span>
            <span> | </span>
            <span>{car.doors.label} doors</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BigCard