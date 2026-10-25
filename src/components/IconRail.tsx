import {
  RiFolderCloudLine,
  RiLightbulbFill,
  RiSettings3Line,
  RiTeamLine,
  RiUserAddLine,
} from '@remixicon/react';
import { RiDiscussLine } from '@remixicon/react';
import {
  CardArrowIcon,
  GridPlusIcon,
  LogoIcon,
  MonitorPulseIcon,
  NoteClockIcon,
} from './icons';

const NAV = [
  { id: 'monitor', label: 'Monitor', icon: <MonitorPulseIcon /> },
  { id: 'chat', label: 'Chats', icon: <RiDiscussLine size={27} />, active: true },
  { id: 'grid', label: 'Apps', icon: <GridPlusIcon /> },
  { id: 'card', label: 'Payments', icon: <CardArrowIcon /> },
  { id: 'note', label: 'Notes', icon: <NoteClockIcon /> },
  { id: 'add', label: 'Add person', icon: <RiUserAddLine size={26} /> },
  { id: 'team', label: 'Team', icon: <RiTeamLine size={26} /> },
  { id: 'folder', label: 'Files', icon: <RiFolderCloudLine size={26} /> },
  { id: 'gear', label: 'Settings', icon: <RiSettings3Line size={26} /> },
];

/** Column 1 — 64px white icon rail. */
export function IconRail() {
  return (
    <aside className="mf-rail">
      <div className="mf-rail-logo">
        <LogoIcon />
      </div>
      <nav className="mf-rail-nav">
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            title={item.label}
            aria-label={item.label}
            className={`mf-rail-btn${item.active ? ' is-active' : ''}`}
          >
            {item.icon}
          </button>
        ))}
      </nav>
      <div className="mf-rail-bottom">
        <button type="button" className="mf-rail-bulb" title="Ideas" aria-label="Ideas">
          <RiLightbulbFill size={21} />
        </button>
        <div className="mf-rail-gg" title="GG">
          GG
        </div>
      </div>
    </aside>
  );
}
