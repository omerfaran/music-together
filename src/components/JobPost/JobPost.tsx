import { type FC } from "react";
import { Avatar, Text, Hr as HrComponent, Card, Image, Button } from "../ui";
import { JobPost as JobPostInterface } from "@/types";
import { formatShortDateTime, formatWithoutTime } from "@/lib/util";

import { AspectImage } from "../ui/Image/AspectImage";

export interface JobPostProps extends JobPostInterface {}

export const JobPost: FC<JobPostProps> = ({
  memberImageSrc,
  memberName,
  created,
  title,
  photoUrl,
  // selectedInstrument,
  // expertise,
  description,
}) => {
  const header = (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar src={memberImageSrc} />
          <Text>{memberName}</Text>
        </div>
        <div>
          <Text>{formatWithoutTime(created)}</Text>
        </div>
      </div>
      <Text center component="h1">
        {title}
      </Text>
    </div>
  );

  const Hr = () => <HrComponent spacing="normal" />;

  const footer = <Button variant="flat">Edit</Button>;

  return (
    <Card header={header} footer={footer}>
      {/* <div className="flex gap-2">
        <Text component="h4">Expertise:</Text>
        {expertise}
      </div> */}
      <Hr />
      <div className="flex gap-2">
        <Text component="h4">Description:</Text>
        {description}
      </div>

      {/* <div className="flex gap-2">
        <Text component="h4">Instrument:</Text>
        {selectedInstrument?.label}
      </div> */}
      {/* <Hr /> */}
      {photoUrl && (
        <>
          <Hr />
          <AspectImage height={200} src={photoUrl} alt="job image" />
        </>
      )}
    </Card>
  );
};
