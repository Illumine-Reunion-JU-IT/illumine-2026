"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CommitteeMember } from "@/data/organisingCommittee";

type Tab = "core" | "responsibilities";
const inks = [
  "#cf3d33",
  "#1a5e67",
  "#b87618",
  "#7e4f8f",
  "#315d3e",
  "#9d394e",
  "#274b8b",
];

function Photo({
  member,
  n,
  small = false,
}: {
  member: CommitteeMember;
  n: number;
  small?: boolean;
}) {
  const initials = member.name
    .split(" ")
    .filter((word) => !word.endsWith("."))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
  return (
    <article className={`group ${small ? "" : "min-w-0"}`}>
      <div
        className={`relative overflow-hidden bg-[#28211e] ${small ? "aspect-square rounded-full border-[5px] border-[#d7c2a4] shadow-[0_8px_18px_rgba(0,0,0,.22)]" : "aspect-[4/4.3] rounded-[1.25rem] border-[7px] border-[#d7c2a4] shadow-[0_16px_32px_rgba(0,0,0,.24)]"}`}
      >
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
            sizes={small ? "140px" : "(max-width: 640px) 100vw, 33vw"}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#9e4038] font-tt-lakes text-3xl font-extrabold text-[#fff4e4]">
            {initials}
          </div>
        )}
        {!small && (
          <span className="absolute left-3 top-3 rounded-full bg-[#fff4e4] px-2 py-1 font-mono text-[9px] font-bold text-[#6c2a24]">
            {String(n).padStart(2, "0")}
          </span>
        )}
      </div>
      {!small && (
        <div className="px-1 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e7865c]">
            {member.role}
          </p>
          <h3 className="mt-1 font-tt-lakes text-lg font-bold leading-tight text-[#fff4e4] sm:text-xl">
            {member.name}
          </h3>
          {member.batch && (
            <p className="mt-1 text-xs text-[#bdb1a4]">{member.batch}</p>
          )}
        </div>
      )}
    </article>
  );
}

function RoleStrip({
  role,
  members,
  order,
  compact = false,
}: {
  role: string;
  members: CommitteeMember[];
  order: number;
  compact?: boolean;
}) {
  const ink = inks[order % inks.length];
  return (
    <section
      id={`role-${role.toLowerCase().replaceAll(" ", "-")}`}
      className={`relative gap-5 border-t border-[#4a413a] py-7 ${compact ? "flex flex-col" : "grid sm:grid-cols-[minmax(13rem,.8fr)_2fr] sm:items-center"}`}
    >
      <div>
        <p
          className="font-mono text-xs font-bold tracking-[.22em]"
          style={{ color: ink }}
        >
          {String(order + 1).padStart(2, "0")} / ROLE
        </p>
        <h3 className="mt-2 font-tt-lakes text-3xl font-extrabold leading-[.95] text-[#fff4e4]">
          {role}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#bdb1a4]">
          {members.length === 1
            ? "Leading this chapter of Illumine."
            : `${members.length} people carrying this chapter forward.`}
        </p>
      </div>
      <div
        className={`grid gap-3 ${members.length === 1 ? "max-w-[16rem] grid-cols-1" : members.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
      >
        {members.map((member, index) => (
          <Photo key={member.name} member={member} n={order * 3 + index + 1} />
        ))}
      </div>
    </section>
  );
}

export default function CommitteeDirectory({
  leadership,
  responsibility,
}: {
  leadership: CommitteeMember[];
  responsibility: CommitteeMember[];
}) {
  const [tab, setTab] = useState<Tab>("core");
  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("General Secretary");
  const [selectedCoreRole, setSelectedCoreRole] = useState("President");
  const groups = useMemo(
    () =>
      [...new Set(responsibility.map((member) => member.role))].map((role) => ({
        role,
        members: responsibility.filter((member) => member.role === role),
      })),
    [responsibility],
  );
  const coreGroups = useMemo(
    () =>
      [...new Set(leadership.map((member) => member.role))].map((role) => ({
        role,
        members: leadership.filter((member) => member.role === role),
      })),
    [leadership],
  );
  const activeGroups = groups
    .map((group) => ({
      ...group,
      members: group.members.filter((member) =>
        `${member.name} ${member.role}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    }))
    .filter((group) => group.members.length);
  const selectedGroup =
    activeGroups.find((group) => group.role === selectedRole) ??
    activeGroups[0];
  const selectedCoreGroup =
    coreGroups.find((group) => group.role === selectedCoreRole) ??
    coreGroups[0];
  return (
    <main className="min-h-screen bg-[#090d16] pb-16 pt-20 text-[#fff4e4] sm:pb-24">
      <div className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(ellipse_at_8%_0%,#15394a_0,transparent_34%),radial-gradient(ellipse_at_96%_16%,#4b242d_0,transparent_33%),radial-gradient(ellipse_at_48%_100%,#2d1e45_0,transparent_45%),linear-gradient(145deg,#090d16_35%,#11131c_68%,#090d16_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(155,224,238,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(155,224,238,.18)_1px,transparent_1px)] [background-size:42px_42px] sm:[background-size:56px_56px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.12] [background-image:repeating-radial-gradient(circle_at_5%_5%,transparent_0,transparent_42px,rgba(233,184,119,.35)_43px,transparent_44px)]" />
      <section className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-8 sm:pt-24">
        <div className="border-b-2 border-[#d9c5aa] pb-7 sm:pb-9">
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
                A portrait ledger of the people bringing the reunion to life.
              </p>
              <p className="mt-3 font-mono text-[9px] tracking-[.12em] text-[#e8b977] sm:mt-4 sm:text-[10px] sm:tracking-[.18em]">
                25 PEOPLE · 7 RESPONSIBILITY STREAMS
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2 border-b border-[#4a413a] sm:mt-7 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-5">
          <div className="grid grid-cols-2 gap-1 sm:flex sm:gap-7">
            <button
              onClick={() => setTab("core")}
              className={`border-b-[3px] px-1 pb-3 text-left text-[10px] font-bold uppercase tracking-[.11em] sm:pb-4 sm:text-[11px] sm:tracking-[.16em] ${tab === "core" ? "border-[#ea7d52] text-[#f1a06f]" : "border-transparent text-[#afa398]"}`}
            >
              Core committee
            </button>
            <button
              onClick={() => setTab("responsibilities")}
              className={`border-b-[3px] px-1 pb-3 text-left text-[10px] font-bold uppercase tracking-[.08em] sm:pb-4 sm:text-[11px] sm:tracking-[.13em] ${tab === "responsibilities" ? "border-[#ea7d52] text-[#f1a06f]" : "border-transparent text-[#afa398]"}`}
            >
              Position of responsibility
            </button>
          </div>
          {tab === "responsibilities" && (
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a person or role"
              aria-label="Search people or roles"
              className="mb-3 w-full border-b border-[#75675b] bg-transparent px-1 py-2 text-sm text-[#fff4e4] placeholder:text-[#8c8177] outline-none focus:border-[#ea7d52] sm:max-w-xs"
            />
          )}
        </div>
        {tab === "core" ? (
          <div className="py-9 sm:py-12">
            <div className="mb-6 sm:mb-7">
              <p className="font-mono text-[10px] font-bold tracking-[.2em] text-[#8fe0e8]">
                01 / STEERING THE LIGHT
              </p>
              <h2 className="mt-2 font-tt-lakes text-2xl font-extrabold sm:text-3xl">
                Core committee
              </h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#6699a1]/70 bg-[radial-gradient(circle_at_88%_12%,rgba(56,173,184,.24),transparent_34%),radial-gradient(circle_at_25%_90%,rgba(111,74,158,.2),transparent_35%),linear-gradient(135deg,rgba(15,32,44,.96),rgba(14,20,30,.94))] shadow-[0_28px_70px_rgba(0,0,0,.32)] backdrop-blur sm:rounded-[1.4rem]">
              <div className="grid lg:grid-cols-[19rem_1fr]">
                <aside className="border-b border-[#6c9199]/45 bg-[#07131d]/55 p-4 backdrop-blur-sm sm:p-5 lg:border-b-0 lg:border-r">
                  <p className="mb-4 font-mono text-[10px] tracking-[.2em] text-[#8fe0e8] sm:mb-5">
                    LEADERSHIP INDEX
                  </p>
                  <label className="block lg:hidden">
                    <span className="sr-only">Choose a core committee role</span>
                    <select
                      value={selectedCoreGroup.role}
                      onChange={(event) => setSelectedCoreRole(event.target.value)}
                      className="w-full rounded-lg border border-[#6c9199]/70 bg-[#102632] px-3 py-3 text-sm font-medium text-[#f1ffff] outline-none focus:border-[#8fe0e8]"
                    >
                      {coreGroups.map((group, index) => (
                        <option key={group.role} value={group.role}>
                          {String(index + 1).padStart(2, "0")}. {group.role}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="hidden gap-2 lg:flex lg:flex-col lg:overflow-visible">
                    {coreGroups.map((group, index) => (
                      <button
                        key={group.role}
                        onClick={() => setSelectedCoreRole(group.role)}
                        className={`shrink-0 rounded-lg px-3 py-3 text-left text-sm transition lg:w-full ${selectedCoreGroup.role === group.role ? "bg-[#277283] text-[#f1ffff] shadow-[0_8px_24px_rgba(39,114,131,.28)]" : "text-[#c8bbb0] hover:bg-white/5 hover:text-white"}`}
                      >
                        <span className="mr-2 font-mono text-[10px] opacity-70">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        {group.role}
                        <span className="float-right opacity-70">
                          {selectedCoreGroup.role === group.role ? "›" : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-[#39434e] pt-4 sm:mt-6 sm:pt-5">
                    <p className="font-mono text-[9px] tracking-[.16em] text-[#8d9ba5]">
                      {leadership.length} CORE MEMBERS
                    </p>
                  </div>
                </aside>
                <section className="p-4 sm:p-7">
                  <div className="border-b border-[#39434e] pb-4 sm:pb-5">
                    <p className="font-mono text-[10px] tracking-[.2em] text-[#8fe0e8]">
                      {String(
                        coreGroups.indexOf(selectedCoreGroup) + 1,
                      ).padStart(2, "0")}{" "}
                      / LEADERSHIP DESK
                    </p>
                    <h3 className="mt-2 font-tt-lakes text-2xl font-extrabold text-[#fff4e4] sm:text-3xl">
                      {selectedCoreGroup.role}
                    </h3>
                    <p className="mt-2 text-sm text-[#bdb1a4]">
                      {selectedCoreGroup.members.length}{" "}
                      {selectedCoreGroup.members.length === 1
                        ? "person"
                        : "people"}{" "}
                      guiding Illumine 2026.
                    </p>
                  </div>
                  <div
                    className={`mt-5 grid gap-3 sm:mt-6 sm:gap-4 ${selectedCoreGroup.members.length === 1 ? "mx-auto max-w-[15rem] grid-cols-1 sm:max-w-[20rem]" : "grid-cols-2"}`}
                  >
                    {selectedCoreGroup.members.map((member, index) => (
                      <Photo key={member.name} member={member} n={index + 1} />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-9 sm:py-12">
            <div className="mb-6 sm:mb-7">
              <p className="font-mono text-[10px] font-bold tracking-[.2em] text-[#e27a50]">
                02 / THE WORK IN MOTION
              </p>
              <h2 className="mt-2 font-tt-lakes text-2xl font-extrabold sm:text-3xl">
                Position of responsibility
              </h2>
            </div>
            {selectedGroup ? (
              <div className="overflow-hidden rounded-2xl border border-[#a77762]/70 bg-[radial-gradient(circle_at_88%_12%,rgba(218,112,73,.25),transparent_34%),radial-gradient(circle_at_20%_90%,rgba(151,91,45,.2),transparent_35%),linear-gradient(135deg,rgba(47,26,27,.96),rgba(22,20,24,.94))] shadow-[0_28px_70px_rgba(0,0,0,.32)] backdrop-blur sm:rounded-[1.4rem]">
                <div className="grid lg:grid-cols-[19rem_1fr]">
                  <aside className="border-b border-[#a77a65]/45 bg-[#1c1013]/55 p-4 backdrop-blur-sm sm:p-5 lg:border-b-0 lg:border-r">
                    <p className="mb-4 font-mono text-[10px] tracking-[.2em] text-[#d99b5d] sm:mb-5">
                      ROLE INDEX
                    </p>
                    <label className="block lg:hidden">
                      <span className="sr-only">Choose a responsibility role</span>
                      <select
                        value={selectedGroup.role}
                        onChange={(event) => setSelectedRole(event.target.value)}
                        className="w-full rounded-lg border border-[#a77a65]/70 bg-[#2c191b] px-3 py-3 text-sm font-medium text-[#fff6e9] outline-none focus:border-[#e9ad69]"
                      >
                        {activeGroups.map((group, index) => (
                          <option key={group.role} value={group.role}>
                            {String(index + 1).padStart(2, "0")}. {group.role}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="hidden gap-2 lg:flex lg:flex-col lg:overflow-visible">
                      {activeGroups.map((group, index) => (
                        <button
                          key={group.role}
                          onClick={() => setSelectedRole(group.role)}
                          className={`shrink-0 rounded-lg px-3 py-3 text-left text-sm transition lg:w-full ${selectedGroup.role === group.role ? "bg-[#cf6942] text-[#fff6e9] shadow-[0_8px_24px_rgba(207,105,66,.28)]" : "text-[#c8bbb0] hover:bg-white/5 hover:text-white"}`}
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
                    <div className="mt-4 border-t border-[#4d443c] pt-4 sm:mt-6 sm:pt-5">
                      <p className="font-mono text-[9px] tracking-[.16em] text-[#8d8278]">
                        {activeGroups.length} ACTIVE STREAMS
                      </p>
                    </div>
                  </aside>
                  <section className="p-4 sm:p-7">
                    <div className="border-b border-[#4d443c] pb-4 sm:pb-5">
                      <p className="font-mono text-[10px] tracking-[.2em] text-[#e9ad69]">
                        {String(
                          activeGroups.indexOf(selectedGroup) + 1,
                        ).padStart(2, "0")}{" "}
                        / RESPONSIBILITY DESK
                      </p>
                      <h3 className="mt-2 font-tt-lakes text-2xl font-extrabold text-[#fff4e4] sm:text-3xl">
                        {selectedGroup.role}
                      </h3>
                      <p className="mt-2 text-sm text-[#bdb1a4]">
                        {selectedGroup.members.length}{" "}
                        {selectedGroup.members.length === 1
                          ? "person"
                          : "people"}{" "}
                        carrying this chapter forward.
                      </p>
                    </div>
                    <div
                      className={`mt-5 grid gap-3 sm:mt-6 sm:gap-4 ${selectedGroup.members.length === 1 ? "mx-auto max-w-[15rem] grid-cols-1 sm:max-w-[20rem]" : "grid-cols-2"}`}
                    >
                      {selectedGroup.members.map((member, index) => (
                        <Photo
                          key={member.name}
                          member={member}
                          n={index + 1}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            ) : (
              <p className="border-t border-[#4a413a] py-12 text-[#c8bbb0]">
                No team member matches that search.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
