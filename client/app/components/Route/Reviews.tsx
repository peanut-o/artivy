import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "陈明",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "学生 | 清华大学",
    comment:
      "我体验了 ELearning 这个网站，它提供了大量关于各种技术相关主题的课程。我对这次体验印象深刻，网站提供了全面的课程选择，适合不同技能水平和兴趣的人。如果你想提升自己在科技行业的知识和技能，我强烈推荐 ELearning！",
  },
  {
    name: "张雅婷",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "全栈开发工程师 | 字节跳动",
    comment:
      "感谢你们精彩的编程教程！教学风格非常出色，教程质量一流。你们将复杂主题拆分成易管理的部分，并涵盖多样的编程语言和主题，这种能力令人印象深刻。实际应用和真实案例强化了理论知识，提供了宝贵的见解。与观众的互动营造了支持性的学习环境。感谢你们的奉献、专业知识和教学热情，继续加油！",
  },
  {
    name: "李志远",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "计算机系统工程师 | 华为",
    comment:
      "感谢你们精彩的编程教程！教学风格非常出色，教程质量一流。你们将复杂主题拆分成易管理的部分，并涵盖多样的编程语言和主题，这种能力令人印象深刻。实际应用和真实案例强化了理论知识，提供了宝贵的见解。与观众的互动营造了支持性的学习环境。感谢你们的奉献、专业知识和教学热情，继续加油！",
  },
  {
    name: "王思琪",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "初级前端开发 | 阿里巴巴",
    comment:
      "我体验了 ELearning 这个网站，它提供了大量关于各种技术相关主题的课程。我对这次体验印象深刻，网站提供了全面的课程选择，适合不同技能水平和兴趣的人。",
  },
  {
    name: "刘芳",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "全栈开发工程师 | 腾讯",
    comment:
      "你们的内容非常特别。我最喜欢的是视频时长很长，这意味着它们详细覆盖了所有内容。这样任何初学者都可以在观看视频时完成一个完整的项目。非常感谢你们。我非常期待接下来的视频，继续保持这份出色的工作！",
  },
  {
    name: "赵雨欣",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "全栈开发工程师 | 美团",
    comment:
      "加入 ELearning！ELearning 专注于实际应用，而不仅仅是教授编程语言或框架背后的理论。我参加了一堂使用 React JS 创建网络市场的课程，它在教我从头到尾创建项目的各个阶段方面非常有帮助。总的来说，我强烈推荐 ELearning 给任何想提高编程技能和构建实际项目的人。ELearning 是一个很棒的资源，将帮助你提升到新的水平。",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assests/business-img.png")}
            alt="商业插图"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            我们的学员是 <span className="text-gradient">我们的骄傲</span>{" "}
            <br /> 看看他们怎么说
          </h3>
          <br />
          <p className={styles.label}>
            我们致力于为每一位学员提供最优质的学习体验。从零基础到专业开发者，我们见证
            了无数学员的成长与蜕变。他们的成功就是我们最大的动力。
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;