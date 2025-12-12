import React, { useState } from 'react';
import {
  Menu as MenuIcon,
  Login as LoginIcon,
  Logout,
  Search,
  ShoppingCart,
  Person,
  Close,
  FavoriteBorder,
  LocalShipping,
  ArrowDropDown,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { translations } from '../../features/language/translations';
import { setLanguage } from '../../features/language/languageSlice';
import ThemeToggle from '../ui/ThemeToggle';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  ) as Language;
  const t = translations[currentLanguage];
  type Language = 'en' | 'de' | 'ru';

  const handleLanguageChange = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  const navigationItems = [
    { label: t.nav.bestseller, path: '/bestseller' },
    { label: t.nav.fiction, path: '/fiction' },
    { label: t.nav.children, path: '/children' },
    { label: t.nav.audioBooks, path: '/audio' },
    { label: t.nav.gifts, path: '/gifts' },
    { label: t.nav.sale, path: '/sale' },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <>
      {/* Top Promo Bar */}
      <div className='bg-gray-200 text-gray-400 dark:bg-gray-600 py-2 px-10'>
        <div className='container-custom flex justify-between items-center'>
          <div className='flex items-center gap-2 text-sm'>
            <LocalShipping className='w-4 h-4' />
            <span>{t.promo}</span>
          </div>
          <div className='hidden md:flex items-center gap-4 text-sm'>
            <span>{t.storeLocator}</span>
            <span>{t.helpContact}</span>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <ToggleButtonGroup
              color='primary'
              value={currentLanguage}
              exclusive
              onChange={(_, newLang) => {
                if (newLang !== null) handleLanguageChange(newLang as Language);
              }}
              aria-label='Language switcher'
            >
              <ToggleButton
                className='py-1! px-2! text-s! dark:bg-gray-400!'
                value='en'
              >
                EN
              </ToggleButton>
              <ToggleButton
                className='py-1! px-2! text-s! dark:bg-gray-400!'
                value='de'
              >
                DE
              </ToggleButton>
              <ToggleButton
                className='py-1! px-2! text-s! dark:bg-gray-400!'
                value='ru'
              >
                RU
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className='sticky top-0 z-50 bg-white dark:dark:text-gray-200 dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700'>
        <div className='container-custom'>
          <div className='flex flex-col md:flex-row gap-4 py-4'>
            {/* Top Row */}
            <div className='flex w-full items-center justify-between text-xs'>
              {/* Left: Menu & Logo */}
              <div className='flex items-center gap-4 md:gap-18'>
                <button
                  className='md:hidden p-2 hover:bg-gray-100 rounded-lg'
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  <MenuIcon />
                </button>
                <Link
                  to='/'
                  className='flex items-center gap-2 no-underline pl-4'
                >
                  <Logo />
                </Link>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex gap-6 ml-8'>
                  {navigationItems.slice(0, 4).map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className='font-medium text-gray-700 dark:text-gray-300 hover:text-white transition-colors'
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button className='flex items-center gap-1 text-gray-700 hover:text-white dark:text-gray-300 '>
                    {t.more} <ArrowDropDown />
                  </button>
                </nav>
              </div>

              {/* Right: Actions */}
              <div className='flex items-center gap-2 md:gap-4'>
                {/* Desktop Search */}
                <div className='hidden md:flex relative'>
                  <div className='relative rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600 transition-colors w-64 lg:w-80'>
                    <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                      <Search className='w-5 h-5 dark:text-gray-400' />
                    </div>
                    <input
                      type='text'
                      placeholder={t.searchPlaceholder}
                      className='w-full pl-10 pr-4 py-2 bg-transparent outline-none'
                    />
                  </div>
                </div>

                {/* Mobile Search Button */}
                <button
                  className='md:hidden p-2 hover:bg-gray-100 rounded-lg'
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <Search />
                </button>

                <button className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 rounded-lg'>
                  <FavoriteBorder />
                </button>

                {/* <Link
                  to='/account'
                  className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 rounded-lg'
                >
                  <Person />
                </Link> */}

                <Link
                  to='/cart'
                  className='relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 rounded-lg'
                >
                  <ShoppingCart />
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                    3
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile Search Bar */}
            {searchOpen && (
              <div className='w-full md:hidden mt-2'>
                <div className='relative rounded-lg bg-gray-100 w-full'>
                  <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                    <Search className='w-5 h-5' />
                  </div>
                  <input
                    type='text'
                    placeholder={t.searchPlaceholder}
                    className='w-full pl-10 pr-4 py-2 bg-transparent outline-none'
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Bottom Row: Desktop Extended Navigation */}
            <div className='hidden md:flex w-full justify-end items-center gap-6 pt-4 text-xs'>
              <nav className='flex gap-6'>
                {/* {navigationItems.slice(4).map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className='text-gray-600 hover:text-primary transition-colors'
                  >
                    {item.label}
                  </Link>
                ))} */}
              </nav>

              <div className='flex items-center gap-4 mr-10'>
                {/* <span className='text-gray-600'>{t.newReleases}</span>
                <button className='btn-secondary px-4 py-2'>
                  {t.subscribe}
                </button> */}
                {user?.isAuthenticated ? (
                  <>
                    <Tooltip title='My Account' arrow>
                      <Link
                        to='/dashboard'
                        className='flex items-center gap-3 px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 rounded-lg transition-colors'
                        onClick={() => setMobileOpen(false)}
                      >
                        <Person className='w-5 h-5' />
                      </Link>
                    </Tooltip>
                    <Tooltip title='Sign Out' arrow>
                      <button
                        onClick={handleLogout}
                        className='w-full text-left flex items-center gap-3 px-3 py-3  hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 rounded-lg transition-colors'
                      >
                        <Logout className='w-5 h-5' />
                      </button>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title='Sign In' arrow>
                      <Link
                        to='/login'
                        className='flex items-center gap-3 px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400  rounded-lg transition-colors mb-2 mr-10'
                        onClick={() => setMobileOpen(false)}
                      >
                        <LoginIcon className='w-5 h-5' />
                      </Link>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className='fixed inset-0 z-50 md:hidden'>
            {/* Overlay */}
            <div
              className='absolute inset-0 bg-black/50'
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <div className='absolute left-0 top-0 h-full w-64 bg-white shadow-xl'>
              <div className='flex items-center justify-between p-4 border-b'>
                <h2 className='text-xl font-bold text-primary'>{t.menu}</h2>
                <button onClick={() => setMobileOpen(false)}>
                  <Close />
                </button>
              </div>
              <nav className='p-4'>
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className='block py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors'
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
