import { useState, useEffect } from "react";
import { Alert, Spinner } from "flowbite-react";

type LoadingAndErrorProps = {
  isLoading: boolean;
  error: any;
};

export const LoadingAndError: React.FC<LoadingAndErrorProps> = ({ isLoading, error }) => {
  const [showDelayMessage, setShowDelayMessage] = useState(false);
  const timeOut = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => {
        setShowDelayMessage(true);
      }, timeOut);
    } else {
      setShowDelayMessage(false);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center items-center h-[50vh]">
          <Spinner size="lg" />
          {showDelayMessage && (
            <p className="text-gray-500 mt-2 text-center">
              The API is deployed on a free instance of Render and might take some time to come up. Please wait...
            </p>
          )}
        </div>
      )}
      {error && (
        <Alert color="failure" className="mt-4">
          Failed to load products. Please try again later.
        </Alert>
      )}
    </>
  );
};
