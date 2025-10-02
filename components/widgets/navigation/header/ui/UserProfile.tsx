import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";

interface UserProfileProps {
  userName?: string;
  userEmail?: string;
  avatarSrc?: string;
  className?: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

export const UserProfile = ({
  userName = "Jason Hughes",
  userEmail = "zoey@example.com",
  avatarSrc = "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  className = "",
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: UserProfileProps) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className={`transition-transform ${className}`}
          color="secondary"
          name={userName}
          size="sm"
          src={avatarSrc}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" onClick={onProfileClick}>
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{userEmail}</p>
        </DropdownItem>
        <DropdownItem key="settings" onClick={onSettingsClick}>
          My Settings
        </DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={onLogoutClick}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
