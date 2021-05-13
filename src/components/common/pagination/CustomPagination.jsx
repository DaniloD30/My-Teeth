// import React from "react";
// import Pagination from "@material-ui/lab/Pagination";
// import { PaginationItem } from "@material-ui/lab";
// import Labels from "~/helpers/enums/Labels";
// import { useTranslation } from "react-i18next";
// import "./CustomPagination.scss"

// const CustomPagination = (props) => {
// 	const { t } = useTranslation();

// 	const pagination = t(Labels.PAGINATION, { returnObjects: true });

// 	const getTitle = (type, page) => {
// 		if (type === "page") {
// 			return pagination["page"] + " " + page;
// 		} else {
// 			return pagination[type];
// 		}
// 	};

// 	return (
// 		<div className="custom-pagination">
// 			<Pagination
// 				{...props}
// 				renderItem={(item) => {
// 					return <PaginationItem {...item} title={getTitle(item.type, item.page)} />;
// 				}}
// 			/>
// 		</div>
// 	);
// };

// export default CustomPagination;
