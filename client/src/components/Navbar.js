import React, { useEffect, useState } from 'react';
import '../app/global.css'
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import cookie from 'js-cookie';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Books', href: '/book', current: false },
  { name: 'Borrowing', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [data, setData] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.get('token')}`;
        const response = await axios.get('http://localhost:5000/api/auth/me');
        console.log(response);
        console.log(response.data);
        if (response.data && response.data.error){
          setData(null);
        }
        else{
        console.log(response.data.decoded);
        setData(response.data.decoded);
        }
      } catch (error) {
          setData(null);
        // console.error('Error fetching data:', error);
      } 
    };

    fetchData();
  }, [isLoggedOut]); // useEffect'i isLoggedOut bağımlılığına sahip yapın

  let loggedIn = false;
  if (data && data.name) {
    loggedIn = true;
  }

  const handleLogout = () => {
    // Cookie'den token anahtarını sil
    cookie.remove('token');

    // isLoggedOut state'ini değiştirerek component'i yeniden yükleyin
    setIsLoggedOut(true);
  };

  const redirectToLogin = () => {
    window.location.href = '/login'; 
  };
  const redirectToSignup = () => {
    window.location.href = '/signup'; 
  }
  return (
    <Disclosure as="nav" className="bg-neutral-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 items-center flex">
                  <img
                    className="h-12 w-auto ml-8 "
                    src="/logo.png"
                    alt="Your Company"
                  />
                  <span style={{ fontFamily: 'cursive', color: 'orange' }}>OnLibrary</span>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-orange-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      {loggedIn ? ( // loggedIn true ise kullanıcı giriş yapmış demektir
                      // Giriş yapmışsa profil bilgilerini göster
                      <>
                      <Disclosure.Button
                          key={"profile"}
                          href={"#"}
                          as="a"
                          className={classNames(
                            false
                              ? 'bg-orange-600 text-white'
                              : 'text-gray-300 hover:bg-orange-900 hover:text-white',
                            'block rounded-full px-3 py-2 text-base font-medium'
                          )}
                          aria-current={false ? 'page' : undefined}
                        >
                          {data.name}
                        </Disclosure.Button>
                        <Disclosure.Button
                          key={"logout"}
                          href={"#"}
                          as="a"
                          onClick={handleLogout} // Logout işlemini çağır
                          className={classNames(
                            false
                              ? 'bg-orange-600 text-white'
                              : 'text-gray-300 hover:bg-orange-900 hover:text-white',
                            'block rounded-full px-3 py-2 text-base font-medium'
                          )}
                          aria-current={false ? 'page' : undefined}
                        >
                          Logout
                        </Disclosure.Button>
                      </>
                    ) : (
                      // Giriş yapmamışsa Login ve Signup düğmelerini göster
                      <>
                        <span className="sr-only">View login/signup</span>
                        <Disclosure.Button
                          key={"Login"}
                          href={"#"}
                          as="a"
                          onClick={redirectToLogin}
                          className={classNames(
                            false
                              ? 'bg-orange-600 text-white'
                              : 'text-gray-300 hover:bg-orange-900 hover:text-white',
                            'block rounded-full px-3 py-2 text-base font-medium'
                          )}
                          aria-current={false ? 'page' : undefined}
                        >
                          {"Login"}
                        </Disclosure.Button>
                        <Disclosure.Button
                          key={"Signup"}
                          as="a"
                          href={"#"}
                          onClick={redirectToSignup}
                          className={classNames(
                            false
                              ? 'bg-orange-600 text-white'
                              : 'text-gray-300 hover:bg-orange-900 hover:text-white',
                            'block rounded-full px-3 py-2 text-base font-medium'
                          )}
                          aria-current={false ? 'page' : undefined}
                        >
                    {"Signup"}
                  </Disclosure.Button>
                </>
              )}
                    </Menu.Button>
                  </div>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}