"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { CommitteeMember } from "@/data/organisingCommittee";
import ArcReactor from "@/components/arc-reactor";
import BigCircle from "@/components/ui/BigCircle";
import BlueCircle from "@/components/ui/BlueCircle";
import DecryptedText from "@/components/ui/DecryptedText";
import Plus from "@/components/ui/Plus";

const roleName = (role: string) => {
  if (role === "Faculty Coordinator") return "Faculty Mentor";
  if (role.startsWith("Design ")) return "Design Team";
  if (role.startsWith("Logistics ")) return "Logistics Team";
  if (role === "Tech Lead") return "Tech Team";
  if (role === "On Day Coordinator") return "On-day Team";
  return role;
};

const designation = (role: string) =>
  role === "Design Lead" || role === "Logistics Lead"
    ? "Lead"
    : role === "Design Coordinator" || role === "Logistics Coordinator"
      ? "Coordinator"
      : role === "On Day Coordinator"
        ? "On-day Coordinator"
        : role;

const descriptions: Record<string, string> = {
  President:
    "Leading with vision, shaping every memory into legacy! Meet the President of ILLUMINE 2K26 — the steady force bringing people, purpose, and the Silver Jubilee celebration together.",
  "Vice President":
    "Leading alongside purpose, connecting people and possibility! Meet the Vice President of ILLUMINE 2K26 — a trusted force helping every idea move from vision to a memorable Silver Jubilee celebration.",
  "Faculty Mentor":
    "Mentors in the classroom, guiding lights of our legacy! Meet our Faculty Advisors of ILLUMINE 2K26 and KERNEL 1.0 — the esteemed faculty of our department, ultimate mentors, and proud alumni who continue to shape our journey. From teaching us every day to steering our grandest fests toward perfection, they are the true pillars of our IT family. Because a Silver Jubilee shines brightest when backed by the wisdom of our own professors!",
  "General Secretary":
    "Leading from the front, turning dreams into legacy! Meet the General Secretary of ILLUMINE 2K26 — the visionary captain, ultimate decision-maker, and guiding light steering this grand Silver Jubilee celebration to absolute perfection. Because every historic fest needs a legendary leader!",
  "Additional General Secretary":
    "Leading with purpose, connecting every effort! Meet the Additional General Secretary of ILLUMINE 2K26 — a driving force behind the coordination, teamwork, and dedication that bring every vision closer to reality. Because great celebrations are built on great leadership!",
  "Joint Secretary":
    "Bridging the gap, turning ideas into action! Meet the Joint Secretary of ILLUMINE 2K26 — the ultimate multitaskers, creative problem-solvers, and driving force keeping the team united and the momentum going. Because flawless execution needs seamless collaboration!",
  Treasurer:
    "Making every penny count, turning every plan into possibility! Meet the Treasurer of ILLUMINE 2K26 and KERNEL 1.0 — the masterminds behind the numbers, guardians of the budget, and the ones keeping every financial move on track. Behind every great fest is a smart plan and a balanced account!",
  "On-day Team":
    "Making every moment count, every second unforgettable! Meet the On-day Coordinators of ILLUMINE 2K26 — the energetic minds on the ground, keeping everything in sync and ensuring every moment of the reunion runs seamlessly. When the big day arrives, they are the ones making the magic.",
  "Tech Team":
    "Powering ideas, driving innovation! Meet the Tech Team of ILLUMINE 2K26 — the tech enthusiasts behind the scenes, ensuring every digital detail runs seamlessly and every idea comes to life. Building the tech that makes the reunion unforgettable!",
  "Design Team":
    "Turning imagination into identity! Meet the Design Team of ILLUMINE 2K26 — the creative minds adding colour, character, and life to every idea, making this reunion truly unforgettable. Because every great celebration deserves a masterpiece!",
  "Logistics Team":
    "Making every moment seamless, one detail at a time! Meet the Logistics Team of ILLUMINE 2K26 — the minds behind the planning, coordination, and execution that bring the grand reunion to life. The countdown to reliving memories and creating new ones begins!",
};

const seniority = (batch?: string) => Number(batch?.replace("UG", "") ?? 0);

const sortMembers = (role: string, members: CommitteeMember[]) =>
  [...members].sort((a, b) => {
    if (role === "Faculty Mentor") {
      const order = [
        "Prof. Parama Bhowmik",
        "Mr. Utpal Kumar Ray",
        "Dr. Munmun Bhattacharya",
      ];
      return order.indexOf(a.name) - order.indexOf(b.name);
    }
    return (
      seniority(b.batch) - seniority(a.batch) || a.name.localeCompare(b.name)
    );
  });

function Photo({ member, n }: { member: CommitteeMember; n: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(n - 1, 5) * 0.07, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group min-w-0"
    >
      <div className="relative aspect-[4/4.3] overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#0a0a0a] shadow-[0_16px_40px_rgba(0,0,0,.45)] transition duration-300 group-hover:border-[#7B61FF]/60 group-hover:shadow-[0_0_28px_rgba(123,97,255,.18)]">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_28%,rgba(123,97,255,.24),transparent_30%),linear-gradient(145deg,#10101c,#070707)] px-5 text-center text-white">
            <span className="absolute h-28 w-28 rounded-full border border-dashed border-[#7B61FF]/60" />
            <span className="absolute h-20 w-20 rounded-full border border-[#B6BBFF]/25" />
            <span className="relative font-mono text-[10px] font-bold uppercase tracking-[.22em] text-[#B6BBFF]">
              Vice President
            </span>
            <span className="relative mt-3 font-tt-lakes text-xl font-extrabold leading-tight">
              To be decided
            </span>
            <span className="relative mt-3 font-mono text-[8px] uppercase tracking-[.18em] text-[#BEF3DF]">
              Seat reserved
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/75 px-2 py-1 font-mono text-[9px] font-bold text-[#B6BBFF] backdrop-blur">
          {String(n).padStart(2, "0")}
        </span>
      </div>
      <div className="px-1 pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#7B61FF]">
          {designation(member.role)}
        </p>
        <h3 className="mt-1 font-tt-lakes text-lg font-bold leading-tight text-white sm:text-xl">
          {member.name}
        </h3>
        {member.batch && (
          <p className="mt-1 text-xs text-[#BEF3DF]/70">{member.batch}</p>
        )}
      </div>
    </motion.article>
  );
}

export default function CommitteeDirectory({
  leadership,
  responsibility,
}: {
  leadership: CommitteeMember[];
  responsibility: CommitteeMember[];
}) {
  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("President");
  const members = useMemo(
    () => [...leadership, ...responsibility],
    [leadership, responsibility],
  );
  const groups = useMemo(() => {
    const roles = [...new Set(members.map((member) => roleName(member.role)))];
    return roles.map((role) => ({
      role,
      members: sortMembers(
        role,
        members.filter((member) => roleName(member.role) === role),
      ),
    }));
  }, [members]);
  const activeGroups = groups
    .map((group) => ({
      ...group,
      members: group.members.filter((member) =>
        `${member.name} ${member.role} ${roleName(member.role)}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    }))
    .filter((group) => group.members.length);
  const selectedGroup =
    activeGroups.find((group) => group.role === selectedRole) ??
    activeGroups[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] pb-16 pt-20 text-white sm:pb-24">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(123,97,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -left-24 top-[18%] opacity-30">
          <ArcReactor size={300} accentColor="teal" className="opacity-25" />
        </div>
        <div className="absolute -right-24 bottom-[8%] opacity-25">
          <ArcReactor size={340} accentColor="purple" className="opacity-25" />
        </div>
        <Plus className="left-[12%] top-[14%]" delay={0.2} />
        <Plus className="right-[12%] top-[40%]" delay={0.6} />
        <Plus className="bottom-[18%] left-[24%]" delay={1} />
        <BigCircle className="right-[8%] top-[12%] scale-75 opacity-30" />
        <BlueCircle className="bottom-[12%] left-[4%] rotate-45 opacity-30" />
      </div>
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-8 sm:px-8 sm:pt-16">
        <header className="relative mb-14 flex flex-col items-center border-b border-white/10 pb-10 text-center sm:mb-16 sm:pb-12">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[.4em] text-[#7B61FF] sm:text-xs">
            Illumine 2026 // Committee Directory
          </p>
          <h1 className="mb-4 font-mechsuit text-3xl font-black uppercase tracking-[.1em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,.12)] sm:text-5xl md:text-6xl">
            <DecryptedText text="CORE COMMITTEE" animateOn="view" speed={70} sequential />
          </h1>
          <div className="mb-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#7B61FF] to-transparent" />
          <p className="max-w-xl text-xs uppercase leading-relaxed tracking-wider text-gray-400 sm:text-sm">
            One core committee, bringing the reunion to life.
          </p>
          <p className="mt-4 font-mono text-[9px] tracking-[.18em] text-[#B6BBFF] sm:text-[10px]">
            {members.length} MEMBERS · {groups.length} COMMITTEE ROLES
          </p>
        </header>
        <div className="py-9 sm:py-12">
          <div className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[.2em] text-[#7B61FF]">
                01 / ONE TEAM, MANY ROLES
              </p>
              <h2 className="mt-2 font-tt-lakes text-2xl font-extrabold sm:text-3xl">
                Core committee
              </h2>
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a member or role"
              aria-label="Search committee members or roles"
              className="w-full border-b border-white/25 bg-transparent px-1 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#7B61FF] sm:max-w-xs"
            />
          </div>
          {selectedGroup ? (
            <div className="overflow-hidden rounded-2xl border border-[#7B61FF]/35 bg-[radial-gradient(circle_at_88%_12%,rgba(123,97,255,.15),transparent_34%),radial-gradient(circle_at_25%_90%,rgba(100,255,218,.06),transparent_35%),linear-gradient(135deg,rgba(15,15,22,.97),rgba(8,8,12,.96))] shadow-[0_28px_70px_rgba(0,0,0,.5)] backdrop-blur sm:rounded-[1.4rem]">
              <div className="grid lg:grid-cols-[19rem_1fr]">
                <aside className="border-b border-white/10 bg-black/35 p-4 backdrop-blur-sm sm:p-5 lg:border-b-0 lg:border-r lg:border-r-white/10">
                  <p className="mb-4 font-mono text-[10px] tracking-[.2em] text-[#7B61FF] sm:mb-5">
                    COMMITTEE INDEX
                  </p>
                  <label className="block lg:hidden">
                    <span className="sr-only">Choose a committee role</span>
                    <select
                      value={selectedGroup.role}
                      onChange={(event) => setSelectedRole(event.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-[#101016] px-3 py-3 text-sm font-medium text-white outline-none focus:border-[#7B61FF]"
                    >
                      {activeGroups.map((group, index) => (
                        <option key={group.role} value={group.role}>
                          {String(index + 1).padStart(2, "0")}. {group.role}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="hidden gap-2 lg:flex lg:flex-col">
                    {activeGroups.map((group, index) => (
                      <button
                        key={group.role}
                        onClick={() => setSelectedRole(group.role)}
                        className={`rounded-lg px-3 py-3 text-left text-sm transition ${selectedGroup.role === group.role ? "bg-[#6265fe] text-white shadow-[0_8px_24px_rgba(98,101,254,.28)]" : "text-white/65 hover:bg-white/5 hover:text-white"}`}
                      >
                        <span className="mr-2 font-mono text-[10px] opacity-70">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        {group.role}
                        <span className="float-right opacity-70">
                          {selectedGroup.role === group.role ? "›" : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-white/10 pt-4 sm:mt-6 sm:pt-5">
                    <p className="font-mono text-[9px] tracking-[.16em] text-white/40">
                      {members.length} CORE MEMBERS
                    </p>
                  </div>
                </aside>
                <motion.section
                  key={selectedGroup.role}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-4 sm:p-7"
                >
                  <div className="border-b border-white/10 pb-4 sm:pb-5">
                    <p className="font-mono text-[10px] tracking-[.2em] text-[#7B61FF]">
                      {String(activeGroups.indexOf(selectedGroup) + 1).padStart(
                        2,
                        "0",
                      )}{" "}
                      / CORE COMMITTEE
                    </p>
                    <h3 className="mt-2 font-tt-lakes text-2xl font-extrabold text-white sm:text-3xl">
                      {selectedGroup.role}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {descriptions[selectedGroup.role]}
                    </p>
                  </div>
                  <div
                    className={`mt-5 grid gap-3 sm:mt-6 sm:gap-4 ${selectedGroup.members.length === 1 ? "mx-auto max-w-[15rem] grid-cols-1 sm:max-w-[20rem]" : "grid-cols-2"}`}
                  >
                    {selectedGroup.members.map((member, index) => (
                      <Photo key={member.name} member={member} n={index + 1} />
                    ))}
                  </div>
                </motion.section>
              </div>
            </div>
          ) : (
            <p className="border-t border-white/10 py-12 text-white/60">
              No committee member matches that search.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
