"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CommitteeMember } from "@/data/organisingCommittee";

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
    "The seat is reserved for the co-pilot of the celebration — ready to connect people, ideas, and every moving part of ILLUMINE 2K26. A new chapter is about to be written.",
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
    <article className="group min-w-0">
      <div className="relative aspect-[4/4.3] overflow-hidden rounded-[1.25rem] border-[7px] border-[#d7c2a4] bg-[#28211e] shadow-[0_16px_32px_rgba(0,0,0,.24)]">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_28%,rgba(143,224,232,.25),transparent_25%),linear-gradient(145deg,#153b48,#171524)] px-5 text-center text-[#fff4e4]">
            <span className="absolute h-28 w-28 rounded-full border border-dashed border-[#8fe0e8]/60" />
            <span className="absolute h-20 w-20 rounded-full border border-[#8fe0e8]/25" />
            <span className="relative font-mono text-[10px] font-bold uppercase tracking-[.22em] text-[#8fe0e8]">
              Vice President
            </span>
            <span className="relative mt-3 font-tt-lakes text-xl font-extrabold leading-tight">
              To be decided
            </span>
            <span className="relative mt-3 font-mono text-[8px] uppercase tracking-[.18em] text-[#d7c2a4]">
              Seat reserved
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[#fff4e4] px-2 py-1 font-mono text-[9px] font-bold text-[#174451]">
          {String(n).padStart(2, "0")}
        </span>
      </div>
      <div className="px-1 pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8fe0e8]">
          {designation(member.role)}
        </p>
        <h3 className="mt-1 font-tt-lakes text-lg font-bold leading-tight text-[#fff4e4] sm:text-xl">
          {member.name}
        </h3>
        {member.batch && (
          <p className="mt-1 text-xs text-[#bdb1a4]">{member.batch}</p>
        )}
      </div>
    </article>
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
    <main className="min-h-screen bg-[#090d16] pb-16 pt-20 text-[#fff4e4] sm:pb-24">
      <div className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(ellipse_at_8%_0%,#15394a_0,transparent_34%),radial-gradient(ellipse_at_96%_16%,#4b242d_0,transparent_33%),radial-gradient(ellipse_at_48%_100%,#2d1e45_0,transparent_45%),linear-gradient(145deg,#090d16_35%,#11131c_68%,#090d16_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(155,224,238,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(155,224,238,.18)_1px,transparent_1px)] [background-size:42px_42px] sm:[background-size:56px_56px]" />
      <section className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-8 sm:pt-24">
        <header className="border-b-2 border-[#d9c5aa] pb-7 sm:pb-9">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#7ce2c7] shadow-[0_0_13px_#7ce2c7]" />
            <p className="font-mono text-[9px] font-bold uppercase tracking-[.25em] text-[#8fe0e8] sm:text-[10px] sm:tracking-[.45em]">
              Illumine 2026 · Directory online
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-6 lg:mt-7 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="font-mechsuit text-[2.25rem] leading-[1.05] tracking-[.045em] sm:text-6xl sm:leading-[1.08] sm:tracking-[.08em]">
              THE PEOPLE
              <br />
              <span className="text-[#f19468]">OF ILLUMINE</span>
            </h1>
            <div className="max-w-sm">
              <p className="font-tt-lakes text-[15px] leading-relaxed text-[#c8bbb0] sm:text-base">
                One core committee, bringing the reunion to life.
              </p>
              <p className="mt-3 font-mono text-[9px] tracking-[.12em] text-[#e8b977] sm:mt-4 sm:text-[10px] sm:tracking-[.18em]">
                {members.length} MEMBERS · {groups.length} COMMITTEE ROLES
              </p>
            </div>
          </div>
        </header>
        <div className="py-9 sm:py-12">
          <div className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[.2em] text-[#8fe0e8]">
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
              className="w-full border-b border-[#6c9199] bg-transparent px-1 py-2 text-sm text-[#fff4e4] placeholder:text-[#8c9da4] outline-none focus:border-[#8fe0e8] sm:max-w-xs"
            />
          </div>
          {selectedGroup ? (
            <div className="overflow-hidden rounded-2xl border border-[#6699a1]/70 bg-[radial-gradient(circle_at_88%_12%,rgba(56,173,184,.24),transparent_34%),radial-gradient(circle_at_25%_90%,rgba(111,74,158,.2),transparent_35%),linear-gradient(135deg,rgba(15,32,44,.96),rgba(14,20,30,.94))] shadow-[0_28px_70px_rgba(0,0,0,.32)] backdrop-blur sm:rounded-[1.4rem]">
              <div className="grid lg:grid-cols-[19rem_1fr]">
                <aside className="border-b border-[#6c9199]/45 bg-[#07131d]/55 p-4 backdrop-blur-sm sm:p-5 lg:border-b-0 lg:border-r">
                  <p className="mb-4 font-mono text-[10px] tracking-[.2em] text-[#8fe0e8] sm:mb-5">
                    COMMITTEE INDEX
                  </p>
                  <label className="block lg:hidden">
                    <span className="sr-only">Choose a committee role</span>
                    <select
                      value={selectedGroup.role}
                      onChange={(event) => setSelectedRole(event.target.value)}
                      className="w-full rounded-lg border border-[#6c9199]/70 bg-[#102632] px-3 py-3 text-sm font-medium text-[#f1ffff] outline-none focus:border-[#8fe0e8]"
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
                        className={`rounded-lg px-3 py-3 text-left text-sm transition ${selectedGroup.role === group.role ? "bg-[#277283] text-[#f1ffff] shadow-[0_8px_24px_rgba(39,114,131,.28)]" : "text-[#c8bbb0] hover:bg-white/5 hover:text-white"}`}
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
                  <div className="mt-4 border-t border-[#39434e] pt-4 sm:mt-6 sm:pt-5">
                    <p className="font-mono text-[9px] tracking-[.16em] text-[#8d9ba5]">
                      {members.length} CORE MEMBERS
                    </p>
                  </div>
                </aside>
                <section className="p-4 sm:p-7">
                  <div className="border-b border-[#39434e] pb-4 sm:pb-5">
                    <p className="font-mono text-[10px] tracking-[.2em] text-[#8fe0e8]">
                      {String(activeGroups.indexOf(selectedGroup) + 1).padStart(
                        2,
                        "0",
                      )}{" "}
                      / CORE COMMITTEE
                    </p>
                    <h3 className="mt-2 font-tt-lakes text-2xl font-extrabold text-[#fff4e4] sm:text-3xl">
                      {selectedGroup.role}
                    </h3>
                    <p className="mt-2 text-sm text-[#bdb1a4]">
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
                </section>
              </div>
            </div>
          ) : (
            <p className="border-t border-[#4a413a] py-12 text-[#c8bbb0]">
              No committee member matches that search.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
