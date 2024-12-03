// Widget.tsx
import { ClerkLoading, useUser, SignedIn } from "@clerk/clerk-react";
import { Spinner } from "../loader/spinner";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/lib/utils"; // Make sure to implement this utility
import Loader from "../loader";
import { useMediaSources } from "@/hooks/useMediaSources"; // Hook for fetching media sources
import MediaConfiguration from "../MediaConfiguration"; // Component for media configuration

const Widget = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useUser();
  const { state, fetchMediaResources } = useMediaSources();

  useEffect(() => {
    if (user && user.id) {
      fetchUserProfile(user.id).then((p) => setProfile(p));
    }
  }, [user]);

  useEffect(() => {
    fetchMediaResources(); // Fetch media sources when the component mounts
  }, []);

  return (
    <div className="p-5">
      <ClerkLoading>
        <div className="h-full flex justify-center items-center">
          <Spinner />
        </div>
      </ClerkLoading>
      <SignedIn>
        {profile ? (
          <MediaConfiguration state={state} user={profile?.user} />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Loader color="#fff" state={false} />
          </div>
        )}
      </SignedIn>
    </div>
  );
};

export default Widget;