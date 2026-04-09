"use client";
import React, { FC, useState, useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import axios from "axios";
import { styles } from "@/app/styles/style";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import Link from "next/link";
import { useGetTranscriptMutation } from "@/redux/features/courses/coursesApi";
import { useParams } from "next/navigation";
import Loader from "../Loader/Loader";

type Props = {
  videoName: string;
};

interface Message {
  text: string;
  role: "user" | "bot";
  timestamp: Date;
}

interface Data {
  transcript?: string;
  success: boolean;
  courseName: string;
}

interface Result {
  data?: Data;
  error?: FetchBaseQueryError | any;
}

const SILICON_API_KEY = "sk-tnxizsqdlpykkunpyeensjnjbelrsmrodfisivkenprydvor";
const SILICON_API_URL = "https://api.siliconflow.cn/v1/chat/completions";
const MODEL_NAME = "Qwen/Qwen3-Omni-30B-A3B-Instruct";

const AiChat: FC<Props> = ({ videoName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [transcript, setTranscript] = useState<string | undefined>("");
  const [courseName, setCourseName] = useState<string | undefined>("");
  const [err, setErr] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
  const courseId = useParams();
  const [getTranscript, { data, isLoading, error }] =
    useGetTranscriptMutation();

  // AI 调用函数
  const callAI = async (prompt: string): Promise<string> => {
    try {
      const response = await axios.post(
        SILICON_API_URL,
        {
          model: MODEL_NAME,
          messages: [
            {
              role: "system",
              content: "你是一个专业的教育助手，帮助学生解答学习问题。请用中文回答。"
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.9,
          max_tokens: 2048,
        },
        {
          headers: {
            "Authorization": `Bearer ${SILICON_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );
      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error("AI API Error:", error);
      if (error.response?.status === 402) {
        return "API 额度不足，请联系管理员充值。";
      }
      return "抱歉，AI 服务暂时不可用，请稍后再试。";
    }
  };
  

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    setIsLoadingAI(true);
    try {
      const userMessage: Message = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");
      
      let trs: string = transcript
        ? `请参考以下课程内容（如需要）- "${transcript}"，`
        : "";
      const prompt: string = `问题：${userInput}
        
请回答以下问题，回答要结合课程《${videoName}》或《${courseName}》的内容。
${trs}
如果问题与课程内容无关或不是编程/学习相关，请回复："请只提问与《${videoName}》课程相关的问题。"`;

      const botResponse = await callAI(prompt);
      
      const botMessage: Message = {
        text: botResponse,
        role: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (err: any) {
      setErr("AI 服务出错了，请稍后再试");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGetTranscript = async () => {
    try {
      const result: Result = await getTranscript({
        id: courseId?.id,
        videoName,
      });
      
      if (result && result.data) {
        let trs: string | undefined = result?.data?.transcript;
        setTranscript(trs);
        let cname: string | undefined = result?.data?.courseName;
        setCourseName(cname);
        
        setIsLoadingAI(true);
        let noTRS: string = `课程《${videoName}》暂时没有可用的文本内容，请根据课程名称提供一个 3-4 行的简短介绍。`;
        let yesTRS: string = `请根据以下内容为课程《${courseName}》提供一个总结：${trs}`;
        const prompt: string = transcript ? yesTRS : noTRS;
        
        const summary = await callAI(prompt);
        const botMessage: Message = {
          text: summary,
          role: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsLoadingAI(false);
      } else {
        setErr("获取课程内容失败，请重试");
      }
    } catch (err) {
      console.error("Error fetching transcript:", err);
      setErr("获取课程内容失败，请重试");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col h-screen p-4">
          <button
            className="p-2 bg-red-500 self-center rounded-full text-white hover:bg-red-400"
            onClick={handleGetTranscript}
          >
            生成摘要
          </button>
          <div className="flex justify-between items-center mb-4">
            <Link href={"/"} className={`${styles.title} !text-2xl`}>
              在线学习 AI 助手 🤖
            </Link>
            <div className="flex space-x-2">
              <ThemeSwitcher />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto rounded-md p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={` ${
                    msg.role === "user"
                      ? `${styles.input}`
                      : " rounded-lg font-Josefin p-2 text-xl text-black dark:text-white bg-blue-200 dark:bg-blue-950 "
                  }`}
                >
                  {msg.text}
                </span>
                <p className={`text-xs ${styles.label} mt-1`}>
                  {msg.role === "bot" ? "助手" : "我"} -{" "}
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))}
            {isLoadingAI && (
              <div className="text-center text-gray-500">AI 正在思考...</div>
            )}
            {err && <div className="text-red-500 text-sm mb-4">{err}</div>}
            <div className="flex items-center mt-4">
              <input
                type="text"
                placeholder="输入你的问题..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className={`${styles.input} !rounded-l-md !flex-1 !p-2 !border-b !border-t !border-l focus:outline-none focus:border-blue-500`}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoadingAI}
                className={`p-2 cursor-pointer bg-[#2190ff] text-white rounded-r-md ml-1 mt-1 hover:bg-opacity-80 focus:outline-none ${
                  isLoadingAI ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoadingAI ? "发送中..." : "发送"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChat;