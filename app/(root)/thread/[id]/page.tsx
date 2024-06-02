import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

const Page = async ({ params }: { params: { id: string } }) => {
	if (!params.id) return null;

	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect("/onboarding");

	const thread = await fetchThreadById(params.id);

	return (
		<section className="relative">
			<div>
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={user?.id || ""}
					parentId={thread.parentId}
					content={thread.text}
					author={thread.author}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.childern}
				/>
			</div>

			<div className="">Comment Here</div>

			<div className="mt-7">
				<Comment
					threadId={thread.id}
					currentUserImg={userInfo.image}
					currentUserId={JSON.stringify(userInfo._id)}
				/>
			</div>

			<div className="mt-10">
				{thread.children.map((childItem: any) => (
					<ThreadCard
						key={childItem._id}
						id={childItem._id}
						currentUserId={user?.id || ""}
						parentId={childItem.parentId}
						content={childItem.text}
						author={childItem.author}
						community={childItem.community}
						createdAt={childItem.createdAt}
						comments={childItem.childern}
						isComment
					/>
				))}
			</div>
		</section>
	);
};

export default Page;
