import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/message";
import Loader from "../components/loader";
import { useNavigate } from "react-router";
import { listOrders } from "../Actions/orderAction";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    if(userInfo&&userInfo.isAdmin){
      dispatch(listOrders());
    }else{
      navigate(`/login`)
    }
  }, [dispatch,navigate,userInfo]);
  


  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table responsive stripped bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Price</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders!==undefined&&(orders.map((order, index) => (
              <tr key={index}>
                <td>{order._id}</td>
                <td>{order.user&&order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid? (
                    order.paidAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                   order.deliveredAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/orders/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                  
                </td>
              </tr>
            )))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
