class BussinessesController < ApplicationController
  before_action :authenticate_user!

	#before for check role is bussissness admin
  before_action :check_role_bussiness_admin, only: [:update, :thong_ke_toan_doanh_nghiep]

  def show
    render json: current_user.bussiness
  end

	#khi nang cap thanh role bussiness admin thi tao ra 1 bussiness
	#Chua test

  def new
		#nothing here, just for creating a url
    render 'layouts/application'
  end

  def create
    @bussiness = Bussiness.new(bussiness_params.merge(user_id: current_user.id))
    if @bussiness.save# render json: bussiness, status: :created
      respond_with @bussiness, status: :created, location: "/bussiness-admin#/"
    else
      render json: @bussiness.errors, status: :unprocessable_entity
    end
  end

  def update
    # byebug
    #create if current_user.bussiness = null
    if current_user.bussiness.update_attributes(bussiness_params)
      render json: current_user.bussiness, status: :ok
    else
      render json: current_user.bussiness.errors, status: :unprocessable_entity
    end
  end



  #GET  /bussinesses/thong_ke_toan_doanh_nghiep(.:format)
  def thong_ke_toan_doanh_nghiep
    # byebug
    @result = {chi_nhanh: [], doanh_thu: []} #format:     {chi nhanh: [chi nhanh 1, chi nhanh 2, chi nhanh 3], doanh_thu: [[], [], []]}
    #Lay danh sach chi nhanh
    branches = current_user.bussiness.branches
    @result[:chi_nhanh] = branches.map {|branch| branch.name}
    
    to_month = params[:toMonth].to_i
    to_year = params[:toYear].to_i
    #Lap qua moi chi nhanh de tinh doanh thu theo tung thang cua  moi chi nhanh
    branches.each do |branch|
      # byebug
      #Lay tat ca ticket da dc thanh toan tu to_year, to_month tro ve truoc
      tickets = []
      branch.tickets.where(status: 'done').asc(:end_use_time).each do |ticket|
          # byebug
          if ticket.end_use_time.year == to_year && ticket.end_use_time.month <= to_month
            tickets << ticket
          end  
      end

      #Group by cac ticket theo thang
      # #=> {1 => [], 2 => {}, 3 => {}, ...}
      # byebug
      tickets_group_by_month = tickets.group_by {|ticket| ticket.end_use_time.month}    #=> hash theo thang
      ##Voi moi thang tinh tong doanh thu
      doanh_thu_theo_thang = Array.new(to_month, 0) #Khoi tao vs doanh thu mac dinh la ko
      tickets_group_by_month.each do |month, tickets_in_a_month| 
        # byebug
        doanh_thu_theo_thang[month.to_i-1] = tickets_in_a_month.inject(0) {|sum, item| sum +  item.price} 
      end

      #Them doanh thu cua chi nhanh doa vao mang @result
      @result[:doanh_thu] << doanh_thu_theo_thang
    end
  end


  def thong_ke_theo_ngay_trong_tuan
    # render json: params, status: :ok
    # byebug
    from_day = params[:from].to_time.beginning_of_day; to_day = params[:to].to_time.end_of_day
    @result = {chi_nhanh: [], doanh_thu: []} #format:     {chi nhanh: [chi nhanh 1, chi nhanh 2, chi nhanh 3], doanh_thu: [[], [], []]}
    #Lay danh sach chi nhanh
    branches = current_user.bussiness.branches
    @result[:chi_nhanh] = branches.map(&:name)
    #Lap qua moi chi nhanh de tinh doanh thu theo tung thang cua  moi chi nhanh
    branches.each do |branch|
      # byebug
      tickets = []
      branch.tickets.where(status: 'done').asc(:end_use_time).each do |ticket|
        # byebug
        tickets << ticket if ticket.end_use_time >= from_day && ticket.end_use_time <= to_day
      end
      # #=> {1 => [], 2 => {}, 3 => {}, ...}
      tickets_group_by_day = tickets.group_by {|ticket| ticket.end_use_time.day}    #=> hash theo thang
      ##Voi moi thang tinh tong doanh thu
      doanh_thu_theo_ngay = Array.new(to_day.day - from_day.day + 1, 0) #Khoi tao vs doanh thu mac dinh la ko
      tickets_group_by_day.each do |day, tickets_in_a_day| 
        # byebug
        doanh_thu_theo_ngay[day - from_day.day] = tickets_in_a_day.inject(0) {|sum, item| sum +  item.price} 
      end

      #Them doanh thu cua chi nhanh doa vao mang @result
      @result[:doanh_thu] << doanh_thu_theo_ngay
    end
    render 'thong_ke_toan_doanh_nghiep.json.jbuilder'
  end


  private
  def bussiness_params
    params.require(:bussiness).permit(:name, :category)
  end

		#Da test
   def check_role_bussiness_admin
     if current_user.is_bussiness_admin?
     else
      render json: {}, status: :not_found
    end
  end
end