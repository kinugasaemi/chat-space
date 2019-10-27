class MessagesController < ApplicationController
  #このページ全てにset_groupメソッドを適用。
  before_action :set_group

  #messages/indexページでメッセージが作られる。
  #また、@group.messagesも定義。
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  #messages/createページでメッセージが保存されると、group_messagesにリダイレクト。
  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  #現在グループIDをparamsで取得。
  def set_group
    @group = Group.find(params[:group_id])
  end

end
