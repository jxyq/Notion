import Collapse from '@/components/Collapse'
import Link from 'next/link'
import { useState } from 'react'

/**
 * 折叠菜单
 * @param {*} param0
 * @returns
 */
export const MenuItemCollapse = (props) => {
  const { link } = props
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  const [isOpen, changeIsOpen] = useState(false)

  const toggleShow = () => {
    changeShow(!show)
  }

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen)
  }

  if (!link || !link.show) {
    return null
  }

  return <>
        <div className='w-full px-8 py-3 text-left border-b dark:bg-hexo-black-gray dark:border-black' onClick={toggleShow} >
            {!hasSubMenu && <Link
                href={link?.to}
                className="font-extralight items-center flex justify-between pl-2 pr-4 dark:text-gray-200 no-underline tracking-widest pb-1">
                <span className='text-blue-400 hover:text-red-400 transition-all items-center duration-200'>{link?.name}</span>
            </Link>}
             {hasSubMenu && <div
                onClick={hasSubMenu ? toggleOpenSubMenu : null}
                className="font-extralight items-center flex justify-between pl-2 pr-4 cursor-pointer  dark:text-gray-200 no-underline tracking-widest pb-1">
                <span className='text-blue-400 hover:text-red-400 transition-all items-center duration-200'>{link?.name}</span>
               <i className={`px-2 fa fa-plus transition-all duration-200 ${isOpen && 'rotate-45'} text-gray-400`}></i>
            </div>}
        </div>

        {/* 折叠子菜单 */}
        {hasSubMenu && <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
            {link.subMenus.map(sLink => {
              return <div key={sLink.id} className='font-extralight dark:bg-black text-left px-10 justify-start text-blue-400 bg-gray-50 hover:bg-gray-50 dark:hover:bg-gray-900 tracking-widest transition-all duration-200 border-b dark:border-gray-800 py-3 pr-6'>
                    <Link href={sLink.to}>
                        <span className='text-xs'>{sLink.title}</span>
                    </Link>
                </div>
            })}
        </Collapse>}
    </>
}
