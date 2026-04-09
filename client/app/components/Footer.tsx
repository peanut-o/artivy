import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">关于我们</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  我们的故事
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  隐私政策
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  常见问题
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">快速链接</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  课程
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  我的账号
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  课程仪表盘
                </Link>
              </li>
            </ul>
          </div>
         <div className="space-y-3">
  <h3 className="text-[20px] font-[600] text-black dark:text-white">社交媒体</h3>
  <ul className="space-y-4">
    <li>
      <Link
        href="https://www.douyin.com/"
        className="text-base text-black dark:text-gray-300 dark:hover:text-white"
        target="_blank"
      >
        抖音
      </Link>
    </li>
    <li>
      <Link
        href="https://www.snapchat.com/"
        className="text-base text-black dark:text-gray-300 dark:hover:text-white"
        target="_blank"
      >
        Snapchat
      </Link>
    </li>
    <li>
      <Link
        href="https://www.bilibili.com/"
        className="text-base text-black dark:text-gray-300 dark:hover:text-white"
        target="_blank"
      >
        Bilibili
      </Link>
    </li>
  </ul>
</div>
          <div>
            <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">联系方式</h3>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              联系电话：+86 021-80572401
            </p>
           
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              地址：未名市嘉南区时光古物店
            </p>
         
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              邮箱：raven_1025_2006@qq.com
            </p>
            
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white">
          版权所有 © 2026 在线学习平台 | 保留所有权利
        </p>
      </div>
      <br />
    </footer>
  )
}

export default Footer