import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/menu.css';
import { useAuth } from '../hooks/useAuth';
import SearchBarSm from './searchBarSm';
import ResetPassword from "./ResetPassword";
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

const Menu = () => {
  const { isLoggedIn, logout, userType } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [display, setDisplay] = useState('hidden');
  const [showMenu, setShowMenu] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const menuRef = useRef(null);
  const checkboxRef = useRef(null);


  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  }
  const handlePopUp = (value) => {
    setShowPopUp(value);
  };
  useEffect(() => {
    function handleClickOutside(event) {

      if (menuRef.current && !menuRef.current.contains(event.target) &&
        checkboxRef.current && !checkboxRef.current.contains(event.target)) {
        setIsChecked(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    setIsChecked(e.target.checked);
  };

  const handleLinkClick = () => {
    setIsChecked(false);
  };

  const handleSearch = () => {
    setDisplay(display === 'hidden' ? 'block' : 'hidden');
  };

  return (
    <nav className="md:hidden font-poppins flex items-center gap-3 text-lg" ref={menuRef}>
      <SearchBarSm display={display} setDisplay={setDisplay} />
      <ResetPassword showPopUp={showPopUp} handlePopUp={handlePopUp}/>
      <div>
        <svg onClick={handleSearch} role='button' tabIndex={0} aria-label='searchButton' className='w-[13px] h-[13px]' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <label id='buttonLabel' aria-label='menu button' className="hamburger-menu" htmlFor='menubutton'>
        <input
          aria-labelledby='buttonLabel'
          type="checkbox"
          id='menubutton'
          ref={checkboxRef}
          checked={isChecked}
          onChange={handleCheckboxClick}
        />
      </label>
      <aside className="navmenu antialiased font-semibold text-sm rounded-bl-md">
        <ul>
          {isLoggedIn ?
            <>
              {userType === 'doctor' ?
                <Link to={"/manage_account"} className='px-4'>Profile</Link> :
                <div>
                  <button className='w-full px-4 flex items-center gap-4'
                    onClick={() => { setShowMenu(!showMenu) }}
                  >
                    <p>Profile</p>
                    {showMenu ?
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                      :
                      <ChevronUpIcon className="ml-2 h-4 w-4" />

                    }
                  </button>

                  <AnimatePresence>
                    {showMenu &&
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className='mt-2 flex flex-col gap-2'
                      >
                        <button className='px-4 text-start' onClick={() => setShowPopUp(true)}>Change Password</button>
                        <Link aria-label="logout" className='px-4' onClick={logout}> Logout</Link>
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>}
            </> :
            <div>
              <button className='w-full px-4 flex items-center gap-4'
                onClick={() => { setShowMenu(!showMenu) }}
              >
                <p>Sign In</p>
                {showMenu ?
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                  :
                  <ChevronUpIcon className="ml-2 h-4 w-4" />

                }
              </button>
              <AnimatePresence>
                {showMenu &&
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to='/sign_in' className='w-full px-5 block mt-2 mb-2' onClick={handleLinkClick}>For Patients</Link>
                    <Link className="w-full px-5 block mt-2 mb-2" to={"/providers_login"} onClick={handleLinkClick} state={{ userType: "doctor" }}>For Doctors</Link>
                    <Link className="w-full px-5 block mt-2 mb-2" to={"/providers_login"} onClick={handleLinkClick} state={{ userType: "facility" }}>For Facilities</Link>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          }
          <Link className='px-4' to="/facilities" onClick={handleLinkClick} id="hospital-link">
            <span>Facilities</span>
          </Link>
          <Link className='px-4' to="/doctors" onClick={handleLinkClick} id="doctors-link">
            <span>Doctors</span>
          </Link>
          <Link to={"/about"} className="px-4 ">About Us</Link>
          <Link className='px-4' to="/services" onClick={handleLinkClick} id="doctors-link">
            <span>Services</span>
          </Link>
        </ul>
      </aside>
    </nav>
  );
};



export default Menu;
