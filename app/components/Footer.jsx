'use client'

import Link from 'next/link'
import Container from './Container'
import { useSearchContext } from '@app/store/search-car'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useSession } from 'next-auth/react'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'

const mostWantedModelsArray = [
  {
    label: 'BMW M4',
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e7&model_id=64d8c1abd7a49bfd5341e1ea',
  },
  {
    label: 'Toyota Supra',
    link: '/',
  },
  {
    label: 'Audi A7',
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e8&model_id=64d8c3add7a49bfd5341e1f9',
  },
  {
    label: 'Volkswagen Arteon',
    link: '/',
  },
  {
    label: 'Audi A6',
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e8&model_id=64d8c3add7a49bfd5341e1f8',
  },
  {
    label: 'BMW M5',
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e7&model_id=64d8c1ddd7a49bfd5341e1ec',
  },
  {
    label: 'Ferrari LaFerrari',
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e4&model_id=64f9ae561001e9ff03de1916',
  },
  {
    label: 'Porsche 911',
    link: '/',
  },
  {
    label: 'Volkswagen Golf 6',
    link: '/',
  },
  {
    label: 'Mercedes Benz C63',
    link: '/',
  },
  {
    label: 'Nissan GTR',
    link: '/',
  },
  {
    label: 'Skoda Octavia',
    link: '/',
  },
]

const Footer = () => {
  const { isFilterMenuOpen, updateFooterView } = useSearchContext()

  const { data: session } = useSession()

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  })

  useEffect(() => {
    if (inView) {
      updateFooterView({ isInView: true, entry })
    } else {
      updateFooterView({ isInView: false, entry })
    }
  }, [inView])

  return (
    <footer
      ref={ref}
      className={`bg-white py-14 shadow-2xl relative ${
        isFilterMenuOpen ? 'z-[-1]' : ''
      }`}
    >
      <Container>
        <div className="flex justify-between xl:gap-52 base-plus:gap-32 lg:gap-10 gap-6 flex-col lg:flex-row relative">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-5 md:text-left text-center">
              Most wanted models
            </h2>
            <ul className="grid lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
              {mostWantedModelsArray?.map((item, i) => (
                <li key={i} className={`${i}`}>
                  <Link
                    className="bg-gray-200 w-full hover:bg-gray-300 sm:text-base text-[0.9rem] font-medium block text-center py-1.5 rounded-[10px]"
                    href={item.link}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-4 right-side">
            <div className="flex lg:justify-end justify-center sm:gap-12 gap-6">
              <div>
                <h3 className="font-semibold text-lg">Dealer</h3>
                <ul className="text-base">
                  {session?.user ? (
                    <li>
                      <Link href="/profile">View profile</Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link href="/signin">Sign in</Link>
                      </li>
                      <li>
                        <Link href="/signup">Join now!</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link href="/terms-and-conditions">
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Legal</h3>
                <ul className="text-base">
                  <li>
                    <Link href="/privacy-policy">Privacy policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center text-center">
              <div>
                <h3 className="font-semibold text-lg">Developed by</h3>
                <ul className="text-base">
                  <li>
                    <Link href="https://www.igorglisovic.com" target="blank">
                      Igor Glišović
                    </Link>
                  </li>
                  <li className="flex justify-center gap-3 mt-1">
                    <Link
                      href="https://www.linkedin.com/in/igor-glisovic/"
                      target="blank"
                      className="text-2xl"
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                    <Link
                      href="https://github.com/igorglisovic"
                      target="blank"
                      className="text-2xl"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
