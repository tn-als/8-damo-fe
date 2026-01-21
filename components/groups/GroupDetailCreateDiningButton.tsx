import { Button } from "../ui/button"

export function GroupDetailCreateDiningButton(){
    const handleCreateDining = () => {
        // TODO: 회식 생성 페이지로 이동
        console.log("Create dining");
    };

    return  <div className="fixed bottom-6 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5">
        <Button
          className="w-full"
          size="lg"
          onClick={handleCreateDining}
        >
          회식 생성하기
        </Button>
      </div>
}