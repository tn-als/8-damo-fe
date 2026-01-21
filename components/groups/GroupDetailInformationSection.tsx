interface GroupDetailProps {
    description: string; 
    memberCount: number;
}

export function GroupDetailInformationSection({description, memberCount}: GroupDetailProps){
    return <div className="px-5">
        <p className="text-base font-semibold text-foreground">{description}</p>
        <p className="mt-1 text-base font-semibold text-foreground">
            현재 멤버 수 {memberCount}명
        </p>
    </div>;
}