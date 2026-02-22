interface LightningDetailDescriptionSectionProps{
  description: string
}
export function LightningDetailDescriptionSection(
  {description}: LightningDetailDescriptionSectionProps){
  return <section className="mt-5">
    <h2 className="text-sm font-semibold text-[#111111]">모임 설명</h2>
    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#374151]">
      {description}
    </p>
    </section>
}