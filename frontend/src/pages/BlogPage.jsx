import React, { useState } from "react";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { Link } from "react-router-dom";
import Models from "../components/Models";

const BlogPage = () => {
  const [showModels, setShowModels] = useState(false);

  return (
    <>
      <div className="mt-0 mb-5">
        <div className=" min-h-[140px] mx-auto">
          <div className="max-w-[80%] mx-auto">
            <div className="mt-7 items-center">
              <h2 className=" font-bold text-sm ">BLOG ARTICLES</h2>
              <h1 className="lg:text-5xl text-3xl font-bold mt-2">Shivan</h1>
            </div>
            <div className="mt-3 flex flex-row gap-3">
              <p className=" font-bold ">By : Prasanth | 12th May 2023</p>
              <Link
                to={"/editpost"}
                className=" cursor-pointer hover:text-green-400"
              >
                <MdEditDocument size={20} />
              </Link>
              <button
                className=" hover:text-red-400"
                onClick={() => setShowModels(!showModels)}
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[77%] mx-auto">
          <div className="mt-2 flex flex-col items-center text-gray-500 ">
            <p>
              ChatGPT is a chatbot and virtual assistant developed by OpenAI and
              launched on November 30, 2022. Based on large language models
              (LLMs), it enables users to refine and steer a conversation
              towards a desired length, format, style, level of detail, and
              language. Successive user prompts and replies are considered at
              each conversation stage as context.[2]\r\n\r\nChatGPT is credited
              with starting the AI boom, which has led to ongoing rapid
              investment in and public attention to the field of artificial
              intelligence. By January 2023, it had become what was then the
              fastest-growing consumer software application in history, gaining
              over 100 million users and contributing to the growth of OpenAI's
              current valuation of $86 billion.[4][5] ChatGPT's release spurred
              the release of competing products, including Gemini, Claude,
              Llama, Ernie, and Grok.[6] Microsoft launched Copilot, initially
              based on OpenAI's GPT-4. In June 2024, a partnership between Apple
              Inc. and OpenAI was announced in which ChatGPT is integrated into
              the Apple Intelligence feature of Apple operating systems.[7] Some
              observers raised concern about the potential of ChatGPT and
              similar programs to displace or atrophy human intelligence, enable
              plagiarism, or fuel misinformation.
            </p>
            <h2 className=" lg:text-4xl text-2xl font-bold mt-2 dark:text-gray-200 text-gray-950">
              Etymology and other names
            </h2>
            <p className="mt-2">
              According to the Monier-Williams Sanskrit dictionary, the word
              "śiva" (Devanagari: शिव, also transliterated as shiva) means
              "auspicious, propitious, gracious, benign, kind, benevolent,
              friendly".[25] The root words of śiva in folk etymology are śī
              which means "in whom all things lie, pervasiveness" and va which
              means "embodiment of grace".[25][26] The word Shiva is used as an
              adjective in the Rig Veda (c. 1700–1100 BCE), as an epithet for
              several Rigvedic deities, including Rudra.[27] The term Shiva also
              connotes "liberation, final emancipation" and "the auspicious
              one"; this adjectival usage is addressed to many deities in Vedic
              literature.[25][28] The term evolved from the Vedic Rudra-Shiva to
              the noun Shiva in the Epics and the Puranas, as an auspicious
              deity who is the "creator, reproducer and dissolver".[25][29]
              Sharma presents another etymology with the Sanskrit root śarv-,
              which means "to injure" or "to kill",[30] interpreting the name to
              connote "one who can kill the forces of darkness".[31] The
              Sanskrit word śaiva means "relating to the god Shiva", and this
              term is the Sanskrit name both for one of the principal sects of
              Hinduism and for a member of that sect.[32] It is used as an
              adjective to characterize certain beliefs and practices, such as
              Shaivism.[33]
            </p>
            <h2 className="  lg:text-4xl text-2xl font-bold mt-2  dark:text-gray-200 text-gray-950">
              Historical development and literature
            </h2>
            <p className="mt-2">
              The Shiva-related tradition is a major part of Hinduism, found all
              over the Indian subcontinent, such as India, Nepal, Sri Lanka,[52]
              and Southeast Asia, such as Bali, Indonesia.[53] Shiva has
              pre-Vedic tribal roots,[21] having "his origins in primitive
              tribes, signs and symbols."[54] The figure of Shiva as he is known
              today is an amalgamation of various older deities into a single
              figure, due to the process of Sanskritization and the emergence of
              the Hindu synthesis in post-Vedic times.[55] How the persona of
              Shiva converged as a composite deity is not well documented, a
              challenge to trace and has attracted much speculation.
            </p>
          </div>
        </div>
      </div>
      <Models show={showModels} setShow={setShowModels} />
    </>
  );
};

export default BlogPage;
