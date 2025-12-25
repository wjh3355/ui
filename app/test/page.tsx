import {
  PartitionBar,
  PartitionBarSegment,
  PartitionBarSegmentTitle,
  PartitionBarSegmentValue
} from "@/registry/8starlabs-ui/blocks/partition-bar";

export default function page() {
  return (
    <div>
      <PartitionBar size="sm" className="w-[90%]" gap={1}>
        <PartitionBarSegment num={2} variant="default" alignment="left">
          <PartitionBarSegmentTitle>
            Segment 1Segment 1Segment 1Segment 1Segment 1Segment 1Segment
            1Segment 1
          </PartitionBarSegmentTitle>
          <PartitionBarSegmentValue>12345</PartitionBarSegmentValue>
        </PartitionBarSegment>
        <PartitionBarSegment num={3} variant="secondary">
          <PartitionBarSegmentTitle>Segment 2</PartitionBarSegmentTitle>
          <PartitionBarSegmentValue>67890</PartitionBarSegmentValue>
        </PartitionBarSegment>
        <PartitionBarSegment num={5} variant="destructive" alignment="right">
          <PartitionBarSegmentTitle>Segment 3</PartitionBarSegmentTitle>
          <PartitionBarSegmentValue>13579</PartitionBarSegmentValue>
        </PartitionBarSegment>
        <PartitionBarSegment num={4} className="bg-purple-600" alignment="left">
          <PartitionBarSegmentTitle className="text-purple-600">
            Segment 4
          </PartitionBarSegmentTitle>
          <PartitionBarSegmentValue>21212</PartitionBarSegmentValue>
        </PartitionBarSegment>
      </PartitionBar>
      <div>aaaaaaaaa</div>
    </div>
  );
}
