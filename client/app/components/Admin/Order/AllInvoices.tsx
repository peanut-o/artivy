import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "¥" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "姓名", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "邮箱", flex: 1 },
          { field: "title", headerName: "课程名称", flex: 1 },
        ]),
    { field: "price", headerName: "价格", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "创建时间", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "发送邮件",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className="dark:text-white text-black"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar }}
              localeText={{
                toolbarDensity: "密度",
                toolbarDensityLabel: "密度",
                toolbarDensityCompact: "紧凑",
                toolbarDensityStandard: "标准",
                toolbarDensityComfortable: "舒适",
                toolbarColumns: "列",
                toolbarColumnsLabel: "列",
                toolbarFilters: "筛选",
                toolbarFiltersLabel: "筛选",
                toolbarFiltersTooltipHide: "隐藏筛选",
                toolbarFiltersTooltipShow: "显示筛选",
                toolbarExport: "导出",
                toolbarExportLabel: "导出",
                toolbarExportCSV: "导出为 CSV",
                toolbarExportPrint: "打印",
                toolbarExportExcel: "导出为 Excel",
                columnsPanelTextFieldLabel: "查找列",
                columnsPanelTextFieldPlaceholder: "列标题",
                columnsPanelDragIconLabel: "重新排序",
                columnsPanelShowAllButton: "显示全部",
                columnsPanelHideAllButton: "隐藏全部",
                filterPanelAddFilter: "添加筛选",
                filterPanelDeleteIconLabel: "删除",
                filterPanelLogicOperator: "逻辑运算符",
                filterPanelOperator: "运算符",
                filterPanelOperatorAnd: "且",
                filterPanelOperatorOr: "或",
                filterPanelColumns: "列",
                filterPanelInputLabel: "值",
                filterPanelInputPlaceholder: "筛选值",
                filterOperatorContains: "包含",
                filterOperatorEquals: "等于",
                filterOperatorStartsWith: "开头是",
                filterOperatorEndsWith: "结尾是",
                filterOperatorIs: "是",
                filterOperatorNot: "不是",
                filterOperatorAfter: "之后",
                filterOperatorOnOrAfter: "之后或等于",
                filterOperatorBefore: "之前",
                filterOperatorOnOrBefore: "之前或等于",
                filterOperatorIsEmpty: "为空",
                filterOperatorIsNotEmpty: "不为空",
                filterOperatorIsAnyOf: "是任意一个",
                columnMenuLabel: "菜单",
                columnMenuShowColumns: "显示列",
                columnMenuFilter: "筛选",
                columnMenuHideColumn: "隐藏列",
                columnMenuUnsort: "取消排序",
                columnMenuSortAsc: "升序",
                columnMenuSortDesc: "降序",
                columnHeaderFiltersTooltipActive: (count) => `${count} 个活跃筛选`,
                columnHeaderFiltersLabel: "显示筛选",
                columnHeaderSortIconLabel: "排序",
                footerRowPerPage: "每页行数:",
                footerTotalRows: (count) => `共 ${count} 行`,
                footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount} / ${totalCount}`,
                checkboxSelectionHeaderName: "复选框选择",
                checkboxSelectionSelectAllRows: "选择全部行",
                checkboxSelectionUnselectAllRows: "取消选择全部行",
                checkboxSelectionSelectRow: "选择行",
                checkboxSelectionUnselectRow: "取消选择行",
                booleanCellTrueLabel: "是",
                booleanCellFalseLabel: "否",
                actionsCellMore: "更多",
                pinToLeft: "固定在左侧",
                pinToRight: "固定在右侧",
                unpin: "取消固定",
                treeExpandGroupNode: "展开",
                treeCollapseGroupNode: "收起",
                treeExpandGroupNodeTooltip: "展开",
                treeCollapseGroupNodeTooltip: "收起",
                groupPanelLabel: "拖动列标题进行分组",
                groupPanelEmptyMessage: "没有分组",
              }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
