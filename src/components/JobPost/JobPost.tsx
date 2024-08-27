import { type FC } from "react";
import { Avatar, Text, Hr as HrComponent, Card, Image, Button } from "../ui";
import { JobPost as JobPostInterface } from "@/types";
import { formatShortDateTime, formatWithoutTime } from "@/lib/util";

export interface JobPostProps extends JobPostInterface {}

export const JobPost: FC<JobPostProps> = ({
  memberImageSrc,
  memberName,
  created,
  title,
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

  return (
    <Card header={header}>
      {/* <div className="flex gap-2">
        <Text component="h4">Expertise:</Text>
        {expertise}
      </div> */}
      <Hr />
      <div className="flex gap-2">
        <Text component="h4">Description:</Text>
        {description}
      </div>
      <Hr />
      {/* <div className="flex gap-2">
        <Text component="h4">Instrument:</Text>
        {selectedInstrument?.label}
        <Image src={selectedInstrument?.imageSrc} alt="instrument" />
      </div> */}
      {/* <Hr /> */}
      <div className="pt-2">
        <Button variant="flat">Edit</Button>
      </div>
    </Card>
  );
};
