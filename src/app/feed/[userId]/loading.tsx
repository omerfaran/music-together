import { Spinner } from "@nextui-org/react";

// Name matters! nextjs will look for this component to display when in loading state

const Loading = () => {
  return (
    // vertical-center class in our class defined in global.css
    <div className="flex justify-center items-center vertical-center">
      <Spinner label="Loading..." color="secondary" labelColor="secondary" />
    </div>
  );
};

export default Loading;
